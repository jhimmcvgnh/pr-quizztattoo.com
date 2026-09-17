import{W as te,A as oe,S as ne,C as N,F as ie,G as ae,P as se,a as re,D as le,d as ce,U as w,z as ue,M as me,c as de,B as pe,e as X,f as fe,g as ve,h as ge,i as he}from"./DdHFeS6X.js";import{_ as xe,r as D,f as we,g as Se,h as ye,i as Pe,j as _e,k as S,c as ze,o as Fe,a as I,S as Ce,l as A}from"./D1IDS9Nd.js";import{u as be}from"./Dd6hkqcA.js";var Me=`uniform float uTime;
uniform float uSpeed;
uniform float uPositionFrequency;
uniform float uPositionHeight;

varying vec3 vPosition;
varying float vUpDot;

vec3 permute(vec3 x) { return mod(((x*44.0)+1.0)*x, 299.0); }

float simplexNoise2d(vec2 v)
{
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 299.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float getElevation(vec2 position) {
    vec2 warpedPosition = position;
    warpedPosition.y -= uTime * uSpeed;
    
    

    float elevation = 0.0;

    elevation += simplexNoise2d(warpedPosition * uPositionFrequency - 2.) * uPositionHeight;

    
    
    

    
    
    

    return elevation;
}

void main() {

  
  
  

    
    float shift = 0.1;
    vec3 positionA = position.xyz + vec3(shift, 0.0, 0.0);
    vec3 positionB = position.xyz + vec3(0.0, 0.0, - shift);

    
    float elevation = getElevation(csm_Position.xz);
    csm_Position.y += elevation;
    positionA.y    += getElevation(positionA.xz);
    positionB.y    += getElevation(positionB.xz);

    
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);
    csm_Normal = cross(toA, toB);

    
    vPosition = csm_Position;
    vPosition.xz += uTime * 0.2;
    vUpDot = dot(csm_Normal, vec3(0.0, 1.0, 0.0));
}`,Le=`uniform vec3 uColorSurface;

void main() {
  csm_DiffuseColor = vec4(vec3(uColorSurface), 1.0);
}`,Ae=`uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;

varying float vFogDepth;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    float pointSize = uSize * aScale * uPixelRatio;
    pointSize *= (1.0 / - viewPosition.z);
    gl_PointSize = pointSize;

    vFogDepth = -viewPosition.z;

}`,Re=`uniform float uTime;
uniform float uSize;
varying float vFogDepth;
uniform float uFogNear;
uniform float uFogFar;
uniform float uOpacity;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    strength = pow(strength, 2.0);
    strength *= 0.5;

    
    vec3 color = vec3(0.05, 0.05, 0.05);
    vec3 fogColor = vec3(0.,0.,0.);
    float fogFactor = smoothstep(uFogNear, uFogFar, vFogDepth);
    color = mix(color, fogColor, fogFactor);
    float alpha = min(strength, uOpacity);

    gl_FragColor = vec4(color, alpha);
}`;const Te={class:"home__canvas"},Be={__name:"HomeCanvas",props:{template:{type:String,default:""}},emits:["isMounted"],setup(Y,{expose:U,emit:O}){const v=D(!1),q=D(null),Z=O;let y,e,R,u,c,P,g,h,_,z,a,o,i,T,m,d,x,r,B,p,F,k,C=!1,H=!1,b=0,M=0,L;const n=Y,j=()=>{a={width:window.innerWidth,height:v.value===!1?window.innerHeight:document.querySelector(".canvas__height").offsetHeight,pixelRatio:Math.min(window.devicePixelRatio,1)},e={fogNear:9,fogFar:14,positionY:-.1,backgroundColor:"#979797",colorSurface:"#555555",segmentsSurface:264,flatShading:!1,ambientLightColor:"#ffffff",ambientLightIntensity:5,toneMappingExposure:1.7,showFPS:!1,diretionalLightColor:"#ffffff",diretionalLightIntensity:2,diretionalLightPosX:1,diretionalLightPosY:3,diretionalLightPosZ:-7,mRefractionRatio:1.02,mFresnelBias:.1,mFresnelPower:1,mFresnelScale:1,rgbShiftStrength:30,radialBlurStrength:40,radialBlurSamples:10,speedFactor:1,starsSpeedZ:.0175,starsSpeedX:.01,mouserotationXAmount:.135,mouserotationYAmount:.615,mouseLerpSpeed:14},n.template==="manifest"&&(e.backgroundColor="#232323",e.colorSurface="#555555",e.diretionalLightColor="#5e5e5e",e.ambientLightColor="#5e5e5e"),R=document.querySelector("canvas.webgl"),i=new te({canvas:R,antialias:!0}),i.toneMapping=oe,i.toneMappingExposure=e.toneMappingExposure,i.setSize(a.width,a.height),i.setPixelRatio(a.pixelRatio),u=new ne,u.background=new N(e.backgroundColor),u.fog=new ie(e.backgroundColor,e.fogNear,e.fogFar),p=new ae,u.add(p),o=new se(35,a.width/a.height,.1,100),u.add(o),o.position.set(2.8,1.5,3.87),o.rotation.set(-.12,.34,0),G(),(n.template==="home"||n.template==="contact")&&$(),_=new re(e.ambientLightColor),_.intensity=e.ambientLightIntensity,u.add(_),z=new le(e.diretionalLightColor,e.diretionalLightIntensity),z.position.set(e.diretionalLightPosX,e.diretionalLightPosY,e.diretionalLightPosZ),p.add(z),T=new he,S.ticker.add(E),H=!0,(n.template==="home"||n.template==="expertise"||n.template==="contact")&&(C=!0),(n.template==="home"||n.template==="expertise"||n.template==="contact")&&V(),Z("isMounted")},G=()=>{c=new ce(20,30,e.segmentsSurface,e.segmentsSurface),c.deleteAttribute("uv"),c.deleteAttribute("normal"),c.rotateX(-Math.PI*.5),P={uSpeed:new w(1.313),uTime:new w(0),uPositionFrequency:new w(.176),uPositionHeight:new w(1.3),uColorSurface:new w(new N(e.colorSurface))},g=new ue({baseMaterial:me,vertexShader:Me,fragmentShader:Le,uniforms:P,flatShading:e.flatShading}),h=new de(c,g);let t;window.innerWidth>768?t=window.innerWidth/1920:t=.75,h.scale.set(t,t,t),h.position.y=e.positionY,p.add(h)},$=()=>{x=window.innerWidth>1280?150:100,r=new pe;const t=new Float32Array(x*3),l=new Float32Array(x);for(let f=0;f<x;f++)t[f*3+0]=(Math.random()-.5)*20,t[f*3+1]=(Math.random()-.5)*4+1,t[f*3+2]=Math.random()*-20+4,l[f]=Math.random()*.75+.75;r.setAttribute("position",new X(t,3)),r.setAttribute("aScale",new X(l,1)),d=r.attributes.position.array,B=r.attributes.aScale.array,m=new fe({uniforms:{uTime:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio,1.5)},uSize:{value:200},uOpacity:{value:1},uFogNear:{value:e.fogNear},uFogFar:{value:e.fogFar}},vertexShader:Ae,fragmentShader:Re,transparent:!0,blending:ve,depthWrite:!1});const s=new ge(r,m);p.add(s)},K=()=>{if(n.template==="home"||n.template==="contact"){const t=e.starsSpeedX*e.speedFactor,l=e.starsSpeedZ*e.speedFactor;for(let s=0;s<x*3;s+=3)d[s+0]-=t,d[s+2]+=B[s/3]*l,d[s+0]<-10&&(d[s+0]=10),d[s+2]>=5&&(d[s+2]=-24);r.attributes.position.needsUpdate=!0}i.render(u,o)},V=()=>{y=S.context(t=>{L=S.timeline({paused:!0}).from(P.uPositionHeight,{value:0,duration:3,ease:"power2.inOut"},0).from("canvas.webgl",{opacity:0,duration:1,ease:"power2.in"},.5),(n.template==="home"||n.template==="contact")&&L.from(m.uniforms.uOpacity,{value:0,duration:4,ease:"power2.inOut"},1.75);const l=S.timeline({duration:1,defaults:{duration:1,ease:"none"}}).set(o.position,{x:o.position.x,y:o.position.y,z:o.position.z},"<").set(o.rotation,{x:o.rotation.x,y:o.rotation.y,z:o.rotation.z},"<").to(o.position,{x:0,y:7.25,z:0},"<").to(o.rotation,{x:Math.PI/180*-90,y:0,z:0},"<").to(e,{speedFactor:.5,mouserotationXAmount:0,mouserotationYAmount:0},"<");n.template==="home"?Ce.create({trigger:".home__hero",start:"top+=20% top",end:"bottom+=250% bottom",scrub:.5,animation:l,invalidateOnRefresh:!0,ease:"none"}):l.progress(1)})},J=()=>{L.play()},Q=t=>{C=t},E=()=>{if(!H)return;const t=T.getElapsedTime();P.uTime.value+=e.starsSpeedZ*e.speedFactor,(n.template==="home"||n.template==="contact")&&(m.uniforms.uTime.value=t),v.value===!1&&F&&(b+=(F-b)/e.mouseLerpSpeed,M+=(k-M)/e.mouseLerpSpeed,p.rotation.set(M*e.mouserotationXAmount,b*e.mouserotationYAmount,0)),C&&K()},W=t=>{},ee=()=>{F=A.mousePos.x/window.innerWidth*2-1,k=A.mousePos.y/window.innerHeight*2-1};return be(()=>{if(a.width=window.innerWidth,a.height=v.value===!1?window.innerHeight:document.querySelector(".canvas__height").offsetHeight,a.pixelRatio=.5,i){let t;window.innerWidth>768?t=window.innerWidth/1920:t=.75,h.scale.set(t,t,t),o.aspect=a.width/a.height,o.updateProjectionMatrix(),i.setSize(a.width,a.height),i.setPixelRatio(a.pixelRatio)}}),U({setAllowRender:Q,playHero:J}),we(()=>{v.value=Se(),j(),document.addEventListener("keypress",W),v.value===!1&&ye(()=>A.mousePos,ee)}),Pe(()=>{document.removeEventListener("keypress",W)}),_e(()=>{S.ticker.remove(E),c==null||c.dispose(),g==null||g.dispose(),r==null||r.dispose(),m==null||m.dispose(),i==null||i.dispose(),i==null||i.forceContextLoss(),y==null||y.revert()}),(t,l)=>(Fe(),ze("div",Te,[I("div",{class:"canvas__height",ref_key:"canvasHeight",ref:q},null,512),l[0]||(l[0]=I("canvas",{class:"webgl"},null,-1))]))}},Ne=xe(Be,[["__scopeId","data-v-d1aa4323"]]);export{Ne as _};
