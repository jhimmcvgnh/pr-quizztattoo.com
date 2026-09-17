const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.eot':  'application/vnd.ms-fontobject',
};

function getMime(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function tryFile(fp) {
  try {
    const stat = fs.statSync(fp);
    return stat.isFile() ? fp : null;
  } catch {
    return null;
  }
}

function resolveFile(rawUrl) {
  let u = rawUrl.split('?')[0];
  try {
    u = decodeURIComponent(u);
  } catch {}

  const ext = path.extname(u).toLowerCase();

  // Root or SPA route (no extension) -> serve index.html
  if (!ext || u === '/' || u === '/pt' || u === '/pt/') {
    return tryFile(path.join(ROOT, 'index.html'));
  }

  // Exact relative path
  const exact = tryFile(path.join(ROOT, u));
  if (exact) return exact;

  const filename = path.basename(u);

  // Map Nuxt latest.json to current build metadata
  if (filename === 'latest.json') {
    const metaFile = tryFile(path.join(ROOT, 'js', '77fe3c84-d1cd-468a-ac22-457ca36ec63a.json'));
    if (metaFile) return metaFile;
  }

  // Map /_nuxt/ prefixed paths
  if (u.startsWith('/_nuxt/')) {
    const stripped = u.replace(/^\/_nuxt\//, '');
    if (ext === '.css') {
      const f = tryFile(path.join(ROOT, 'css', filename));
      if (f) return f;
    }
    if (ext === '.js') {
      const f = tryFile(path.join(ROOT, 'js', filename));
      if (f) return f;
    }
    const f = tryFile(path.join(ROOT, stripped));
    if (f) return f;
  }

  // Fallback: search standard asset directories
  for (const dir of ['css', 'images', 'media', 'js']) {
    const f = tryFile(path.join(ROOT, dir, filename));
    if (f) return f;
  }

  return null;
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

const server = http.createServer((req, res) => {
  req.on('error', (err) => console.error('Request error:', err.message));
  res.on('error', (err) => console.error('Response error:', err.message));

  // CORS & Security headers for smooth local experience
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url;
  console.log(`REQ: ${req.method} ${url}`);
  if (url.startsWith('/__log')) {
    try {
      const q = decodeURIComponent(url.slice(6));
      console.log('>>> [BROWSER]:', q);
    } catch {
      console.log('>>> [BROWSER]:', url);
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    return;
  }

  const fp = resolveFile(url);

  if (!fp) {
    const ext = path.extname(url.split('?')[0]).toLowerCase();
    // SPA fallback: any non-asset route serves index.html
    if (!ext) {
      const idx = path.join(ROOT, 'index.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(idx).pipe(res);
      return;
    }
    // Graceful fallback for missing JS/CSS chunks (un-crawled routes/prefetches)
    if (ext === '.css') {
      res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
      res.end('/* stub */');
      return;
    }
    if (ext === '.js') {
      res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
      res.end('export default {};\n');
      return;
    }
    if (ext === '.json') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end('{}\n');
      return;
    }
    console.log(`404 Not Found: ${url}`);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }

  const ext = path.extname(fp).toLowerCase();
  const stat = fs.statSync(fp);
  const fileSize = stat.size;
  const mimeType = getMime(fp);

  // HTTP 206 Range support for video streaming (Chrome / Safari / Edge video playback)
  if ((ext === '.mp4' || ext === '.webm') && req.headers.range) {
    const range = req.headers.range;
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      res.writeHead(416, { 'Content-Range': `bytes */${fileSize}` });
      res.end();
      return;
    }

    const chunksize = end - start + 1;
    const file = fs.createReadStream(fp, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': mimeType,
    });
    file.pipe(res);
    return;
  }

  res.writeHead(200, {
    'Content-Type': mimeType,
    'Content-Length': fileSize,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache',
  });

  const stream = fs.createReadStream(fp);
  stream.on('error', () => {
    if (!res.headersSent) res.writeHead(500);
    res.end();
  });
  stream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`   Acesse: http://localhost:${PORT}/pt`);
});
