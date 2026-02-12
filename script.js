let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 80;


/* ⭐ STAR GALAXY */

let starGeo = new THREE.BufferGeometry();
let starVertices = [];

for(let i=0;i<1000;i++){
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

let starMaterial = new THREE.PointsMaterial({
color:0xffffff,
size:1.2
});

let stars = new THREE.Points(starGeo,starMaterial);
scene.add(stars);


/* ✨ FIREFLIES */

let fireflies=[];

for(let i=0;i<60;i++){

let geo = new THREE.SphereGeometry(0.8,10,10);
let mat = new THREE.MeshBasicMaterial({color:0xffff88});

let fly = new THREE.Mesh(geo,mat);

fly.position.set(
(Math.random()-0.5)*120,
(Math.random()-0.5)*120,
(Math.random()-0.5)*120
);

scene.add(fly);
fireflies.push(fly);
}


/* ❤️ PERFECT HEART GEOMETRY */

function createHeartShape(){

const heartShape = new THREE.Shape();

heartShape.moveTo(5,5);

heartShape.bezierCurveTo(5,5,4,0,0,0);
heartShape.bezierCurveTo(-6,0,-6,7,-6,7);
heartShape.bezierCurveTo(-6,11,-3,15,5,19);
heartShape.bezierCurveTo(12,15,16,11,16,7);
heartShape.bezierCurveTo(16,7,16,0,10,0);
heartShape.bezierCurveTo(7,0,5,5,5,5);

const geometry = new THREE.ShapeGeometry(heartShape);
geometry.center();

return geometry;
}


/* ❤️ FLOATING HEART UNIVERSE */

let hearts=[];
let heartMaterial = new THREE.MeshBasicMaterial({
color:0xff2e63,
side:THREE.DoubleSide
});

for(let i=0;i<150;i++){

let heart = new THREE.Mesh(createHeartShape(),heartMaterial);

heart.scale.set(0.3,0.3,0.3);

heart.position.set(
(Math.random()-0.5)*120,
(Math.random()-0.5)*120,
(Math.random()-0.5)*120
);

scene.add(heart);
hearts.push(heart);
}


/* 💕 HEART TEXT */

function createName(){

hearts.forEach(h => scene.remove(h));

let name = "SAMATA"; // Change name

let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 200;

ctx.fillStyle = "white";
ctx.font = "bold 120px Arial";
ctx.textAlign = "center";
ctx.fillText(name, canvas.width/2, 140);

let imageData = ctx.getImageData(0,0,canvas.width,canvas.height).data;

for(let y=0; y<canvas.height; y+=8){
for(let x=0; x<canvas.width; x+=8){

let index = (y * canvas.width + x) * 4;

if(imageData[index] > 128){

let heart = new THREE.Mesh(
createHeartShape(),
new THREE.MeshBasicMaterial({
color:0xff69b4,
transparent:true,
opacity:0.9
})
);

heart.scale.set(0.35,0.35,0.35);

heart.position.x = (x - canvas.width/2) * 0.5;
heart.position.y = -(y - canvas.height/2) * 0.5;
heart.position.z = 0;

scene.add(heart);
}
}
}
}


/* 💋 BUTTON EVENT */

document.getElementById("kissBtn").onclick=()=>{

document.getElementById("bgMusic").play();

hearts.forEach(h=>{
gsap.to(h.position,{
x:h.position.x*2.5,
y:h.position.y*2.5,
z:h.position.z*2.5,
duration:1.2
});
});

gsap.to(camera.position,{
z:50,
duration:2
});

setTimeout(createName,1300);
};


/* 🎬 ANIMATION LOOP */

function animate(){

requestAnimationFrame(animate);

stars.rotation.y += 0.0006;

hearts.forEach(h=>{
h.rotation.z += 0.02;
});

fireflies.forEach(f=>{
f.position.x += Math.sin(Date.now()*0.001)*0.03;
f.position.y += Math.cos(Date.now()*0.001)*0.03;
});

renderer.render(scene,camera);
}

animate();


/* 📱 RESPONSIVE */

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);

});

