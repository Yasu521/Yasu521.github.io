const buttonsConfig = [
{
    id: "About Me",
    texts: { en: "About Me", ja: "自己紹介", fr: "Qui suis-je", zh: "关于我" },
    links: { en: "https://aicurion.com/aboutme-ja", ja: "https://aicurion.com/aboutme-ja", fr: "https://aicurion.com/aboutme-ja", zh: "https://aicurion.com/aboutme-ja" },
    position: { top: "30%", left: `20%` }
},
{
    id: "Project",
    texts: { en: " Projects", ja: "活動", fr: "Projets", zh: "项目" },
    links: { en: "https://aicurion.com/project-ja", ja:"https://aicurion.com/project-ja", fr: "https://aicurion.com/project-ja", zh:"https://aicurion.com/project-ja" },
    position: { top: "40%", left: "20%" }
},
{
    id: "News",
    texts: { en: "News", ja: "お知らせ", fr: "Nouvelles", zh: "消息" },
    links: { en: "https://example.com/contact-en", ja: "https://example.com/contact-ja", fr: "https://example.com/contact-fr", zh: "https://example.com/contact-zh" },
    position: { top: "50%", left: "20%" }
},
{
    id: "Contact",
    texts: { en: "Contact", ja: "連絡先", fr: "Contact", zh: "联系我们" },
    links: { en: "https://example.com/contact-en", ja: "https://example.com/contact-ja", fr: "https://example.com/contact-fr", zh: "https://example.com/contact-zh" },
    position: { top: "60%", left: "20%" }
}
];
const buttonContainer = document.getElementById("buttonContainer");
buttonsConfig.forEach(config => {
const button = document.createElement("a");
button.id = config.id;
button.className = "menu-button";
button.href = config.links.en;
button.textContent = config.texts.en;
button.style.top = config.position.top;
button.style.left = config.position.left;
button.style.right = config.position.right;
button.style.style = config.position.style;
buttonContainer.appendChild(button);
});
const languageButtons = document.querySelectorAll('.language-option');
languageButtons.forEach(button => {
button.addEventListener('click', () => {
    const selectedLanguage = button.getAttribute('data-lang');
    buttonsConfig.forEach(config => {
        const btn = document.getElementById(config.id);
        btn.textContent = config.texts[selectedLanguage];
        btn.href = config.links[selectedLanguage];
    });});});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(0, 0, 10).normalize();
scene.add(light);
const textures = {
dustTextures: [
"https://dl.dropboxusercontent.com/scl/fi/sva9qrbssn69ay5ykc28o/dust.png?rlkey=8n0kkpdn0puu5ekdxsfdtnhtz"
],
orangeTextures : [
"https://dl.dropboxusercontent.com/scl/fi/zyivghngvnfc71ikcafps/1.png?rlkey=3c4vsl45wo80qx7exeyzcuq4e",
"https://dl.dropboxusercontent.com/scl/fi/yqmbt074l4qkg9xbo4iar/7.png?rlkey=fxe6tbwfgzdl4zysflmz7czal",
"https://dl.dropboxusercontent.com/scl/fi/3n4vleq7xk60oz34ribb5/9.png?rlkey=5o9a13i8xysy681j0k76zv1ut",
"https://dl.dropboxusercontent.com/scl/fi/vrta53tp1viw1fu16h2td/11.png?rlkey=jq7d7dyz8ek7wpercxvme44bj",
],
fallingTextures2 : [
"https://dl.dropboxusercontent.com/scl/fi/0wa6yxelpdercgik0u0j6/2.png?rlkey=k7e1754lx18hqd5j521ao4y87",
"https://dl.dropboxusercontent.com/scl/fi/pcdzb2aqaqmm8ws974x1i/5.png?rlkey=fx3joybf5cr3i83nwogrvzv4o",
"https://dl.dropboxusercontent.com/scl/fi/jv6ny1dh36v5fffqq08aw/plant_precise_123.png?rlkey=vp9xfp5bqoxhc1gwuk081n6wc",
"https://dl.dropboxusercontent.com/scl/fi/lzg5fecuc6zkmpos8wsj9/plant_precise_213.png?rlkey=ire3jdvzuxpqqhsuggtoxnh89",
],
whiteTextures : [
"https://dl.dropboxusercontent.com/scl/fi/zfnd4l56tfxkbtj9kdc9e/3.png?rlkey=prfaxcyukhmvmq0hwfe7ft27r",
"https://dl.dropboxusercontent.com/scl/fi/0poeyuv7ixzkjwc1p480r/4.png?rlkey=2gymu5lpgega57bitk08k1ozv",
"https://dl.dropboxusercontent.com/scl/fi/dl19zzqdjum88t3ixtpgk/6.png?rlkey=qp9ceajs61pk25ij86vq89pfd",
],
blueTextures : [
"https://dl.dropboxusercontent.com/scl/fi/5scqus7wsfmzc7zmzpywl/plant_precise_128.png?rlkey=api5p4joynhvrlc7j5a1iuc7v",
"https://dl.dropboxusercontent.com/scl/fi/o0z3jedp00h0m2ammrg7w/plant_precise_129.png?rlkey=c4321d422isk61n5oie909g0s",
"https://dl.dropboxusercontent.com/scl/fi/qr8kqeoxkz3dm2rhn6jcr/plant_precise_130.png?rlkey=yfrun5y4qsifs8scqrkyr39f3",
"https://dl.dropboxusercontent.com/scl/fi/2scrur6tzb5j43rk1fvwl/plant_precise_214.png?rlkey=dfziafr6i3jwckl80mmrei6q3",
"https://dl.dropboxusercontent.com/scl/fi/qzoadtbtro8iwdky9meyj/plant_precise_216.png?rlkey=s9h9cj33eaefbnta0oidzvlut",
"https://dl.dropboxusercontent.com/scl/fi/l87xs77jt4da78uxt37ae/plant_precise_220.png?rlkey=68v8uogkr0ft0qtq3xphdzhr0",
"https://dl.dropboxusercontent.com/scl/fi/inrp4743y26jpo6o2mdkx/plant_precise_373.png?rlkey=gkdpre7lv42eq57quolrqlbes",
"https://dl.dropboxusercontent.com/scl/fi/ecjhoxexulhxd4amxa2ij/plant_precise_391.png?rlkey=wvg56jmehave4i4lrvt8g27rk",
"https://dl.dropboxusercontent.com/scl/fi/uh84eo8btp8l3xe151gwa/plant_precise_403.png?rlkey=ia4xvok8288vnu2an9p554n26",
],
pinkTextures : [
"https://dl.dropboxusercontent.com/scl/fi/yizqmfomoc0xuag4y32bm/plant_precise_258.png?rlkey=zhrhsbr2gx9m8idfb189ffqco",
"https://dl.dropboxusercontent.com/scl/fi/qyi72q9i0sg6mpdrfpyp7/plant_precise_260.png?rlkey=nzyc222lc7b9mf4chvapp08uv",
"https://dl.dropboxusercontent.com/scl/fi/j53zthropm0dtemo19az4/plant_precise_261.png?rlkey=2m7t71tjvze2k7eo5zmo4tdxc",
"https://dl.dropboxusercontent.com/scl/fi/qk96rs4954mmvsye7e1j6/plant_precise_262.png?rlkey=v7b37b82xu2n65bhtv5w4x2h7",
"https://dl.dropboxusercontent.com/scl/fi/ua37hsw2t97odcs7lbxcb/plant_precise_263.png?rlkey=xoquijqovku7geavfblkj83ff",
"https://dl.dropboxusercontent.com/scl/fi/m2n649a21wx8fiuh4lxjl/plant_precise_264.png?rlkey=q6xhndzo10auw8i3cb7mf7jke",
"https://dl.dropboxusercontent.com/scl/fi/lqol7xy7htboet7ak7pdg/plant_precise_265.png?rlkey=83h4zgr2gzlral7m59oqyujdv",
"https://dl.dropboxusercontent.com/scl/fi/m7hgvvp5h4wqkihl7ei5j/plant_precise_266.png?rlkey=x1fafwuka16f4vl4wij2p5jy9",
],
groundTextures : [
"https://dl.dropboxusercontent.com/scl/fi/5pnr4rzo8w9ielzwxc1se/plant_precise_11.png?rlkey=ih3lrxpt5auq30sdy20um5six",
"https://dl.dropboxusercontent.com/scl/fi/cjh8oqk0i4vg150v653gu/plant_precise_12.png?rlkey=opv8k1mry2nrn6vwt6nzdbns0",
"https://dl.dropboxusercontent.com/scl/fi/bl84non5etenxjayxp9rz/plant_precise_15.png?rlkey=ppnnmaxm3c5uwt00n8c9qcf8k"
],
groundTextures2:[
"https://dl.dropboxusercontent.com/scl/fi/t32pdiftkw0an9uirw9eh/plant_precise_13.png?rlkey=vgnnljjhubr2a92hidkut5x0f",
"https://dl.dropboxusercontent.com/scl/fi/xl0lmtynbac3c59eqhq7f/plant_precise_14.png?rlkey=t8nnu9d53205gulwzegil9sp3",
"https://dl.dropboxusercontent.com/scl/fi/boz2mgryuihopknixfide/plant_precise_16.png?rlkey=izk2qbsi2qrdqat9qk20hqqbv",
"https://dl.dropboxusercontent.com/scl/fi/m1gl6618wcw1fbgsidqhx/plant_precise_17.png?rlkey=7w5j1vs7bfkbv04lq50oc364c",
],
groundTextures3:[
"https://dl.dropboxusercontent.com/scl/fi/irm28o48uzjnqylh9rg8u/plant_precise_18.png?rlkey=v67uox08hp73yawb9uecj3i8e",
"https://dl.dropboxusercontent.com/scl/fi/bqoqotikbdcgmvaah5bbt/plant_precise_32.png?rlkey=kyc73m4t1sopg5a4ftuywyiku",
"https://dl.dropboxusercontent.com/scl/fi/bok9d2xbvcxvj3g5zkqfe/plant_precise_33.png?rlkey=0yhl2km0e7szdmukh92mfou8b"
],
groundTextures4:[
"https://dl.dropboxusercontent.com/scl/fi/xgsocs6syv0ws8y4ta9aj/plant_precise_28.png?rlkey=joc3t9hs44bamiy74u8918aho",
"https://dl.dropboxusercontent.com/scl/fi/s0ptb2twg2wy1iwgi9oul/plant_precise_29.png?rlkey=gwk3w1ip3uljxbgrhl0vo67ui",
"https://dl.dropboxusercontent.com/scl/fi/nr5xo1cg8fzxqdxmkytmv/plant_precise_30.png?rlkey=a5hgt4mt26fmu5omvdqpmcotd",
"https://dl.dropboxusercontent.com/scl/fi/q8ouojde26fuyrl1w315n/plant_precise_31.png?rlkey=6pnctvehddyvgweqjsn1avr3z",
]
}
const textureCache = new Map();
const manager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(manager);
const startTime = Date.now();

manager.onProgress = (url, itemsLoaded, itemsTotal) => {
const progress = (itemsLoaded / itemsTotal) * 100;
document.getElementById("progress-bar").style.width = `${progress}%`;
const elapsedTime = (Date.now() - startTime) / 1000;
const estimatedTotalTime = (elapsedTime / itemsLoaded) * itemsTotal;
const remainingTime = Math.max(0, estimatedTotalTime - elapsedTime);
document.getElementById("remaining-time").textContent = `Estimated time left: ${remainingTime.toFixed(2)}s`;
};
manager.onLoad = () => {
console.log("All textures loaded");
document.getElementById("loading-screen").style.display = "none";
document.getElementById("main-content").style.display = "block";
animate();
};
Object.keys(textures).forEach((category) => {
textures[category].forEach((url) => {
loader.load(url, (texture) => {
    textureCache.set(url, texture);
});
});
});
Object.values(textures).flat().forEach((url) => {
const isAudio = url.endsWith(".mp3");
if (isAudio) {
const audio = new Audio(url);
textureCache.set(url, audio);
} else {
const img = new Image();
img.src = url;
img.onload = () => console.log(`Image loaded: ${url}`);
img.onerror = (err) => console.error(`Failed to load image: ${url}`, err);
textureCache.set(url, img);
}
});
const loadingDots = document.getElementById("loading-dots");
let dotCount = 0;
setInterval(() => {
dotCount = (dotCount + 1) % 4;
loadingDots.textContent = ".".repeat(dotCount);
}, 500);

let dustPlants = [];
let dustPlants2 = [];
let fallingFlowers = [];
let growingFlowers = [];
let growingFlowers2 = [];
let growingFlowers3 = [];
let growingFlowers4 = [];
let sideFlowers = [];
const cubes = [];

const cubeData = [
{ position: { x: 3, y: 3, z: -50 }, size: { x: 3, y: 3, z: 3 }, label: '欢迎' },
{ position: { x: 3, y: -3, z: -50 }, size: { x: 3, y: 3, z: 3 }, label: 'Bonjour' },
{ position: { x: -3, y: 3, z: -50 }, size: { x: 3, y: 3, z: 3 }, label:  "こんにちは"},
{ position: { x: -3, y: -3, z: -50 }, size: { x: 3, y: 3, z: 3 }, label: 'Wellcome' },
{ position: { x: 0, y: 0, z: -50 }, size: { x: 0.5, y: 0.5, z: 0.5 }, label: ' "Touch" ' },
];
const flowerGroups = [
{ flowers: growingFlowers, maxScale: 8 },
{ flowers: growingFlowers2, maxScale: 8 },
{ flowers: growingFlowers3, maxScale: 8 },
{ flowers: growingFlowers4, maxScale: 8 },
{ flowers: sideFlowers, maxScale: 7 },
{ flowers: fallingFlowers, maxScale: 9 },
];

const clock = new THREE.Clock();
let appear = true;
function createLabeledCube(position, size, labelText) {
const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
const material = new THREE.MeshBasicMaterial({ 
color: 0x00ff00
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(position.x, position.y, position.z);
const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;
const context = canvas.getContext('2d');
context.fillStyle = 'black';
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = 'white';
context.font = '48px Arial';
context.textAlign = 'center';
context.textBaseline = 'middle';
context.fillText(labelText, canvas.width / 2, canvas.height / 2);
const texture = new THREE.CanvasTexture(canvas);
const textMaterial = new THREE.MeshBasicMaterial({ 
map: texture,
transparent: true,
opacity: 1
});
const materials = [
textMaterial,
textMaterial,
textMaterial, 
textMaterial, 
textMaterial,
textMaterial  
];
cube.material = materials;
return cube;
}
cubeData.forEach(data => {
const cube = createLabeledCube(data.position, data.size, data.label);
scene.add(cube);
cubes.push(cube);
});
const MAX_SCROLL_SPEED = 3;
const MIN_SCROLL_SPEED = -3;
let lastTouchY = 0;
let lastTouchX = 0;
let autoSpeed = 0.5;
let scrollSpeed = 0 ;
let currentZ = 0;
let lastMouseY = 0;
const topflower = 0 ;
camera.position.x = 0
camera.position.y = 0
camera.position.z = 30;
let cameraZ = 0;
let lastCameraZ = 0;
let startX = 0;
let startY = 0;
const renderRange = { zMin: -100, zMax: 50 };
const shiftThreshold = 2;
const scale = Math.random() * 2;
const random_1 = Math.random() * 2;
const cameraPositionDisplay = document.getElementById('camera-position');
function createtopFlowers(startZ, endZ) {
for (let x = -5; x <= 75; x += Math.random() * 10) {
for (let z = startZ; z <= endZ; z += 10) {
const textureUrl = textures.orangeTextures[Math.floor(Math.random() * textures.orangeTextures.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
    const material = new THREE.SpriteMaterial({ map: cachedTexture });
    const sprite = new THREE.Sprite(material);
    const posX = -35 + x;
    const posY = 5 + 10 * Math.sin((x / 70) * Math.PI) + Math.random() * 5;
    const posZ = z + Math.random() * 50 + 10;
    sprite.position.set(posX, posY, posZ);
    sprite.scale.set(scale, scale, 1);
    const baseRotation = Math.PI - 5.5;
    const rotationOffset = (Math.random() - 0.5) * Math.PI / 6;
    sprite.material.rotation = baseRotation + rotationOffset;
    fallingFlowers.push(sprite);
    scene.add(sprite);
}}}}

function creategroundFlowers(startZ, endZ) {
for (let x = -40; x < 40; x += 10) {
for (let z = startZ; z < endZ; z += 20) {
const textureUrl = textures.whiteTextures[Math.floor(Math.random() * textures.whiteTextures.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
    const material = new THREE.SpriteMaterial({ map: cachedTexture });
    const sprite = new THREE.Sprite(material);

sprite.position.set(
    x + Math.random() * 10 - 5,
    Math.random() * 3 - 15,
    z + Math.random() * 10 - 5
);          
sprite.scale.set(scale, scale, 1);
const maxTilt = Math.PI / 6;
const minTilt = -Math.PI / 6;
sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
fallingFlowers.push(sprite); 
scene.add(sprite);         
}}}}
function createwhiteFlowers_right(startZ, endZ) {
for (let x = 5; x < 18; x += 5) {
for (let z = startZ; z < endZ; z += 40) {
const textureUrl = textures.blueTextures[Math.floor(Math.random() * textures.blueTextures.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
const material = new THREE.SpriteMaterial({ map: cachedTexture });
const sprite = new THREE.Sprite(material);
const posX = x + random_1 + 12; 
const posY = x + Math.random() * 30 - 25; 
const posZ = z + random_1;    
sprite.position.set(posX, posY, posZ);
sprite.scale.set(scale, scale, 1);
const maxTilt = Math.PI / 4 + (posY + 40) / 50;
const minTilt = Math.PI / 8 + (posY + 40) / 200;
sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
sideFlowers.push(sprite);
scene.add(sprite);
}}}}
function createpinkFlowers_right(startZ, endZ) {
for (let x = 20; x < 30 ; x += 5) {
for (let z = startZ; z < endZ; z += 40) {
const textureUrl = textures.pinkTextures[Math.floor(Math.random() * textures.pinkTextures.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
const material = new THREE.SpriteMaterial({ map: cachedTexture });
const sprite = new THREE.Sprite(material);
const posX = x + Math.random() *1.5 ;
const posY = x + Math.random() * 30 - 30;
const posZ = z + random_1 - 8;
sprite.position.set(posX, posY, posZ);
sprite.scale.set(scale, scale, 1);
const maxTilt = Math.PI / 4 + (posY + 40) / 50;
const minTilt = Math.PI / 8 + (posY + 40) / 200;
sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
sideFlowers.push(sprite);
scene.add(sprite);
}}}}
function createwhiteFlowers_left(startZ, endZ) {
for (let x = - 15; x < -10 ; x += 3) {
for (let z = startZ; z < endZ; z += 40) {
const textureUrl = textures.blueTextures[Math.floor(Math.random() * textures.blueTextures.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
const material = new THREE.SpriteMaterial({ map: cachedTexture });
const sprite = new THREE.Sprite(material);
const posX = x + random_1 - 10 ; 
const posY = - x + Math.random() * 30 - 30;
const posZ = z + random_1;
sprite.position.set(posX, posY, posZ);
sprite.scale.set(scale, scale, 1);
const maxTilt = - Math.PI / 4 + (posY + 40) / 50;
const minTilt = - Math.PI / 8 + (posY + 40) / 200; 
sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
sideFlowers.push(sprite);
scene.add(sprite);
}}}}
function createpinkFlowers_left(startZ, endZ) {
for (let x = - 30; x < -20 ; x += 3) {
for (let z = startZ; z < endZ; z += 40) {
const textureUrl = textures.pinkTextures[Math.floor(Math.random() * textures.pinkTextures.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
const material = new THREE.SpriteMaterial({ map: cachedTexture });
const sprite = new THREE.Sprite(material);
const posX = x + random_1 - 4;
const posY = - x + Math.random() * 30 - 30;
const posZ = z + random_1 - 8;
sprite.position.set(posX, posY, posZ);
sprite.scale.set(scale, scale, 1);
const maxTilt = - Math.PI / 4 + (posY + 40) / 150;
const minTilt = - Math.PI / 8 + (posY + 40) / 200; 
sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt -10;
sideFlowers.push(sprite);
scene.add(sprite);
}}}}
function createtopGround(startZ, endZ) {
for (let x = -12; x < 80; x += Math.random()*5) { 
for (let z = startZ; z < endZ; z += Math.random()*5) {
const textureUrl = textures.groundTextures[Math.floor(Math.random() * textures.groundTextures.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
const material = new THREE.SpriteMaterial({ map: cachedTexture });
const sprite = new THREE.Sprite(material);
sprite.position.set(
x + random_1 - 35,
10 + 10 * Math.sin((x / 70) * Math.PI) + Math.random() * 5,
z + random_1
);
sprite.scale.set(scale, scale, 1);
const baseRotation = Math.PI - 5.5;
const rotationOffset = (Math.random() - 0.5) * Math.PI / 6;
sprite.material.rotation = baseRotation + rotationOffset;
growingFlowers.push(sprite);
scene.add(sprite);
}}}}
function createGround(startZ, endZ) {
for (let x = -40; x < 40; x += 2) {
for (let z = startZ; z < endZ; z += 5) {
const textureUrl = textures.groundTextures2[Math.floor(Math.random() * textures.groundTextures2.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
const material = new THREE.SpriteMaterial({ map: cachedTexture });
const sprite = new THREE.Sprite(material);
sprite.position.set(
x + random_1 + 5, 
Math.random() * 5 - 20, 
z + random_1
);
sprite.scale.set(scale, scale, 1);
growingFlowers2.push(sprite);
scene.add(sprite);    
}}}}
function createGround_right(startZ, endZ) {
for (let x = 4; x < 18; x += 2) { 
for (let z = startZ; z < endZ; z += 2) { 
const textureUrl = textures.groundTextures3[Math.floor(Math.random() * textures.groundTextures3.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
const material = new THREE.SpriteMaterial({ map: cachedTexture });
const sprite = new THREE.Sprite(material);
const posX = x + random_1 + 20; 
const posY = x + Math.random() * 30 - 30;
const posZ = z + random_1;
sprite.position.set(posX, posY, posZ);
sprite.scale.set(scale, scale, 1);
const maxTilt = Math.PI / 4 + (posY + 40) / 100;
const minTilt = Math.PI / 8 + (posY + 40) / 200;
sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt; 
growingFlowers3.push(sprite);
scene.add(sprite);
}}}}
function createGround_left(startZ, endZ) {
for (let x = - 20; x < -5 ; x += 2) {
for (let z = startZ; z < endZ; z += 2) {
const textureUrl = textures.groundTextures4[Math.floor(Math.random() * textures.groundTextures4.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
const material = new THREE.SpriteMaterial({ map: cachedTexture });
const sprite = new THREE.Sprite(material);
const posX = x + random_1 - 20;
const posY = - x + Math.random() * 30 - 30;
const posZ = z + random_1;
sprite.position.set(posX, posY, posZ);
sprite.scale.set(scale, scale, 1);
const maxTilt = - Math.PI / 4 + (posY + 40) / 100;
const minTilt = - Math.PI / 8 + (posY + 40) / 200;
sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt + 25 ;
growingFlowers4.push(sprite);
scene.add(sprite);
}}}}
function dustFlowers(startZ, endZ) {
for (let x = -20; x < 20; x += 5) {
for (let z = startZ; z < endZ; z += 5) { 
    const textureUrl = textures.dustTextures[Math.floor(Math.random() * textures.dustTextures.length)];
    const cachedTexture = textureCache.get(textureUrl);
    if (cachedTexture) {
    const material = new THREE.SpriteMaterial({ map: cachedTexture });
    const sprite = new THREE.Sprite(material);
    const posX = x + random_1 + 5;
    const posY = Math.random() * 50 - 15;
    const posZ = z + Math.random() * 2 + 10;
    sprite.position.set(posX, posY, posZ);
    sprite.scale.set(scale, scale, 1);
    const maxTilt =  Math.PI / 4 + (posY + 40) / 50; 
    const minTilt =  Math.PI / 8 + (posY + 40) / 200;
    sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
    if(Math.random()<=0.2)
        {
        dustPlants.push(sprite);
        scene.add(sprite);
    }}}}}
function dustFlowers2(startZ, endZ) {
for (let x = -20; x < 20; x += 5) {
for (let z = startZ; z < endZ; z += 5) {

const textureUrl = textures.fallingTextures2[Math.floor(Math.random() * textures.fallingTextures2.length)];
const cachedTexture = textureCache.get(textureUrl);
if (cachedTexture) {
const material = new THREE.SpriteMaterial({ map: cachedTexture });
const sprite = new THREE.Sprite(material);
    const posX = x + random_1 + 5 ;
    const posY = Math.random() * 50 + 0;
    const posZ = z + Math.random() * 10 - 10;
    sprite.position.set(posX, posY, posZ);
    sprite.scale.set(scale, scale, 1);
    const maxTilt =  Math.PI / 4 + (posY + 40) / 50; 
    const minTilt =  Math.PI / 8 + (posY + 40) / 200;
    sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
    if(Math.random()<=0.2)
        {
        dustPlants2.push(sprite);
        scene.add(sprite);
    }}}}}
function dustupFlowers() {
dustPlants.forEach(sprite => {
if (scrollSpeed >= 0)sprite.position.y += scrollSpeed*0.1*Math.random() + 0.01;});
}
function dustdownFlowers() {
dustPlants2.forEach(sprite => {
if (scrollSpeed >= 0 )
sprite.position.y -= scrollSpeed*0.1*Math.random() +0.05; 
});}
function removeObjectsOutOfRange(objectsList, zMin, zMax) {
for (let i = objectsList.length - 1; i >= 0; i--) {
const object = objectsList[i];
if (object.position.z < zMin || object.position.z > zMax) {
    scene.remove(object);
    objectsList.splice(i, 1);
}}}
function removeFlowersOutOfRange(zMin, zMax) {
const objectLists = [growingFlowers, growingFlowers2,growingFlowers3,growingFlowers4,fallingFlowers, sideFlowers];
objectLists.forEach(list => removeObjectsOutOfRange(list, zMin, zMax));
}
function update() {
const cameraZ = camera.position.z;
if (Math.abs(cameraZ - lastCameraZ) > shiftThreshold) {
const shiftAmount = cameraZ - lastCameraZ;
renderRange.zMin += shiftAmount;
renderRange.zMax += shiftAmount;
removeFlowersOutOfRange(renderRange.zMin - 1, renderRange.zMax + 1);
if (shiftAmount > 0) {
    createtopGround(renderRange.zMax - shiftAmount, renderRange.zMax);
    createGround(renderRange.zMax - shiftAmount, renderRange.zMax);
    createGround_right(renderRange.zMax - shiftAmount, renderRange.zMax);
    createGround_left(renderRange.zMax - shiftAmount, renderRange.zMax);
    dustFlowers(renderRange.zMax - shiftAmount, renderRange.zMax);
    dustFlowers2(renderRange.zMax - shiftAmount, renderRange.zMax);
}
else{
    createtopGround(renderRange.zMin, renderRange.zMin - shiftAmount);
    createGround(renderRange.zMin, renderRange.zMin - shiftAmount);
    createGround_left(renderRange.zMin, renderRange.zMin - shiftAmount);
    createGround_right(renderRange.zMin, renderRange.zMin - shiftAmount);
    dustFlowers(renderRange.zMin, renderRange.zMin - shiftAmount);
    dustFlowers2(renderRange.zMin, renderRange.zMin - shiftAmount);
}
lastCameraZ = cameraZ;
}}
function growFlowers(flowers, maxScale) {
flowers.forEach(flower => {
const growth = Math.random() * 0.05 + 0.6;
if (flower.scale.x < maxScale) {
    flower.scale.set(
        flower.scale.x + growth,
        flower.scale.y + growth
    );}});}
function growAllFlowers() {
flowerGroups.forEach(group => {
growFlowers(group.flowers, group.maxScale);
});}

function animate() {
requestAnimationFrame(animate);
const totalSpeed = autoSpeed + scrollSpeed;
currentZ -= totalSpeed * 0.3;
camera.position.z = currentZ;
scrollSpeed *= 0.8;
camera.position.z = currentZ;
dustupFlowers();
dustdownFlowers();
update();
removeFlowersOutOfRange(renderRange.zMin - 1, renderRange.zMax + 1); 
if(Math.random()<=0.05){
createpinkFlowers_right(renderRange.zMin, renderRange.zMax);
createpinkFlowers_left(renderRange.zMin, renderRange.zMax);
createwhiteFlowers_right(renderRange.zMin, renderRange.zMax);
createwhiteFlowers_left(renderRange.zMin, renderRange.zMax);
creategroundFlowers(renderRange.zMin, renderRange.zMax);
createtopFlowers(renderRange.zMin, renderRange.zMax);
}
renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});
window.addEventListener("mousemove", (event) => {
const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
const mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
camera.rotation.y = - mouseX * 0.5;
camera.rotation.x =  mouseY * 0.2;
growAllFlowers();});
window.addEventListener("wheel", (event) => {
scrollSpeed -= event.deltaY * 0.05;
scrollSpeed = Math.max(MIN_SCROLL_SPEED, Math.min(MAX_SCROLL_SPEED, scrollSpeed));
growAllFlowers();});
window.addEventListener('click', () => growAllFlowers());
const maxYRotation = 2.61799; 
const minYRotation = -2.61799; 
const maxXRotation = Math.PI / 4;
const minXRotation = -Math.PI / 4;
let lastTouchX = null;
let lastTouchY = null; 
function onTouchMove(event) {
if (event.touches.length === 1) {
  const touch = event.touches[0];
  
  if (lastTouchX !== null && lastTouchY !== null) {
      const deltaX = (touch.clientX - lastTouchX) * 0.005;
      const deltaY = (touch.clientY - lastTouchY) * 0.005;
      camera.rotation.y += deltaX;
      camera.rotation.y = Math.max(minYRotation, Math.min(maxYRotation, camera.rotation.y));
      camera.rotation.x += deltaY;
      camera.rotation.x = Math.max(minXRotation, Math.min(maxXRotation, camera.rotation.x));
      growAllFlowers();
  }
  lastTouchX = touch.clientX;
  lastTouchY = touch.clientY;
}
}
function onTouchEnd() {
lastTouchX = null;
lastTouchY = null;
}
document.addEventListener("touchmove", onTouchMove, { passive: false });
document.addEventListener("touchend", onTouchEnd);
document.addEventListener("touchcancel", onTouchEnd);
animate();
