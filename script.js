let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

let renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 80;


/* ⭐ STAR FIELD */

let starGeo = new THREE.BufferGeometry();
let starVertices = [];

for(let i=0;i<800;i++){
starVertices.push(
(Math.random()-0.5)*400,
(Math.random()-0.5)*400,
(Math.random()-0.5)*400
);
}

starGeo.setAttribute(
'position',
new THREE.Float32BufferAttribute(starVertices,3)
);

let stars = new THREE.Points(
starGeo,
new THREE.PointsMaterial({color:0xffffff,size:1.2})
);

scene.add(stars);


/* ✨ FIREFLIES */

let fireflies=[];

for(let i=0;i<40;i++){

let fly = new THREE.Mesh(
new THREE.SphereGeometry(0.8,8,8),
new THREE.MeshBasicMaterial({color:0xffff88})
);

fly.position.set(
(Math.random()-0.5)*120,
(Math.random()-0.5)*120,
(Math.random()-0.5)*120
);

scene.add(fly);
fireflies.push(fly);
}


/* ❤️ HEART SHAPE */

function createHeartShape(){

const heart = new THREE.Shape();

heart.moveTo(5,5);
heart.bezierCurveTo(5,5,4,0,0,0);
heart.bezierCurveTo(-6,0,-6,7,-6,7);
heart.bezierCurveTo(-6,11,-3,15,5,19);
heart.bezierCurveTo(12,15,16,11,16,7);
heart.bezierCurveTo(16,7,16,0,10,0);
heart.bezierCurveTo(7,0,5,5,5,5);

const geo = new THREE.ShapeGeometry(heart);
geo.center();

return geo;
}


/* ❤️ FLOATING HEARTS */

let hearts=[];
let heartMat = new THREE.MeshBasicMaterial({
color:0xff2e63,
side:THREE.DoubleSide
});

for(let i=0;i<120;i++){

let h = new THREE.Mesh(createHeartShape(),heartMat);

h.scale.set(0.3,0.3,0.3);

h.position.set(
(Math.random()-0.5)*120,
(Math.random()-0.5)*120,
(Math.random()-0.5)*120
);

scene.add(h);
hearts.push(h);
}


/* 💕 TEXT DISPLAY */

function createName(){
let nameDisplay = document.getElementById("nameDisplay");
nameDisplay.style.opacity = "0";
nameDisplay.style.transform = "translate(-50%, -50%) scale(0.5)";

setTimeout(()=>{
nameDisplay.style.transition = "all 0.8s ease-out";
nameDisplay.style.opacity = "1";
nameDisplay.style.transform = "translate(-50%, -50%) scale(1.2)";
},100);
}


/* 💋 BUTTON */

document.getElementById("kissBtn").onclick=()=>{

let music=document.getElementById("bgMusic");
music.currentTime=0;
music.play().catch(()=>{});

hearts.forEach(h=>{
gsap.to(h.position,{
x:h.position.x*2,
y:h.position.y*2,
z:h.position.z*2,
duration:1.2
});
});

gsap.to(camera.position,{z:50,duration:2});

setTimeout(createName,1300);
};


/* 🎬 LOOP */

function animate(){

requestAnimationFrame(animate);

stars.rotation.y+=0.0005;

hearts.forEach(h=>h.rotation.z+=0.02);

fireflies.forEach(f=>{
f.position.x+=Math.sin(Date.now()*0.001)*0.02;
f.position.y+=Math.cos(Date.now()*0.001)*0.02;
});

renderer.render(scene,camera);
}

animate();


/* 📱 RESPONSIVE */

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);

});
