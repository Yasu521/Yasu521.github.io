const supportedLanguages = ["en", "fr", "ja","zh"];
const browserLanguage = navigator.language.substring(0, 2);
const defaultLanguage = supportedLanguages.includes(browserLanguage) ? browserLanguage : "en";
let currentLanguage = defaultLanguage;
const flagImages = {
    en: './flag/USA.webp',
    ja: './flag/Japan.webp',
    fr: './flag/France.webp',
    zh: './flag/China.webp'
}
const cubeData = [
    { position: { x: 0, y: 0, z: 0 }, size: { x: 50, y: 50, z: 30}, label: '' },

    { position: { x: 0, y: 6, z: -30 }, size: { x: 10, y: 4, z: 70}, label: '' },
    { position: { x: 0, y: -6, z: -30 }, size: { x: 10, y: 4, z: 70}, label: '' },

    { position: { x: -30, y: 30, z: -30 }, size: { x: 50, y: 100, z: 70 }, label: '' },
    { position: { x: 30, y: 30, z: -30 }, size: { x: 50, y: 100, z: 70 }, label: '' },

    { position: { x: 2, y: 2, z: -40 }, size: { x: 3, y: 3, z: 3 }, label: '欢迎' },
    { position: { x: 2, y: -2, z: -40 }, size: { x: 3, y: 3, z: 3 }, label: 'Bonjour' },
    { position: { x: -2, y: 2, z: -40 }, size: { x: 3, y: 3, z: 3 }, label:  "こんにちは"},
    { position: { x: -2, y: -2, z: -40 }, size: { x: 3, y: 3, z: 3 }, label: 'Wellcome' },

    { position: { x: 0, y: 6, z: -45 }, size: { x: 5, y: 5, z: 5 }, label: '↓' },
    { position: { x: 0, y: -6, z: -45 }, size: { x: 5, y: 5, z: 5 }, label: '↑' },
    { position: { x: 6, y: 0, z: -45}, size: { x: 5, y: 5, z: 5 }, label: '←' },
    { position: { x: -6, y: 0, z: -45}, size: { x: 5, y: 5, z: 5 }, label: '→' },

    { position: { x: 0, y: 6, z: -55 }, size: { x: 5, y: 5, z: 5 }, label: '↓' },
    { position: { x: 0, y: -6, z: -55 }, size: { x: 5, y: 5, z: 5 }, label: '↑' },
    { position: { x: 6, y: 0, z: -55}, size: { x: 5, y: 5, z: 5 }, label: '←' },
    { position: { x: -6, y: 0, z: -55}, size: { x: 5, y: 5, z: 5 }, label: '→' },
    ];
const textures = {
    dustTextures: [
    "./flower/dust.webp",
    ],
    orangeTextures : [
    "./flower/1.webp",
    "./flower/7.webp",
    "./flower/9.webp",
    "./flower/11.webp",
    "./flower/12.webp",
    ],
    fallingTextures2 : [
    "./flower/2.webp",
    "./flower/5.webp",
    "./flower/373.webp",
    "./flower/378.webp",
    ],
    whiteTextures : [
    "./flower/3.webp",
    "./flower/4.webp",
    "./flower/6.webp",
    ],
    blueTextures : [
    "./flower/124.webp",
    "./flower/125.webp",
    "./flower/127.webp",
    "./flower/220.webp",
       ],
    pinkTextures : [
    "./flower/258.webp",
    "./flower/260.webp",
    "./flower/261.webp",
    "./flower/263.webp",
    "./flower/266.webp",
         ],
    groundTextures : [
    "./flower/15.webp",
    ],
    groundTextures2:[
    "./flower/17.webp",
    ],
    groundTextures3:[
    "./flower/18.webp",
    ],
    groundTextures4:[
    "./flower/31.webp",
    ],
    };
    const textureCache = new Map();
    const manager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(manager);
    const startTime = Date.now();
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        const progress = (itemsLoaded / itemsTotal) * 50;
        document.getElementById("progress-bar").style.width = `${progress}%`;
        const elapsedTime = (Date.now() - startTime) / 1000;
        const estimatedTotalTime = (elapsedTime / itemsLoaded) * itemsTotal;
        const remainingTime = Math.max(0, estimatedTotalTime - elapsedTime);
        document.getElementById("progress-bar").style.width = `${progress}%`;
        document.getElementById("remaining-time").textContent = 
        `(${progress.toFixed(2)}%, ${remainingTime.toFixed(2)}s left)`;
        };
    manager.onLoad = () => {
        checkAnimationStability();
    };

function loadTexture(url) {
    return new Promise((resolve, reject) => {
        loader.load(
            url,
            (texture) => {
                textureCache.set(url, texture);
                resolve(texture);
            },
            undefined,
            (err) => {
                reject(err);
            });});}
(async () => {
    const allUrls = Object.values(textures).flat();
    await Promise.all(allUrls.map(loadTexture));
    manager.onLoad();
})();
const loadingDots = document.getElementById("loading-dots");
let dotCount = 0;
function updateLoadingDots() {
    dotCount = (dotCount + 1) % 4;
    loadingDots.textContent = ".".repeat(dotCount);
    requestAnimationFrame(updateLoadingDots);
}
updateLoadingDots();

let isAnimationStable = false;
function checkAnimationStability() {
    let stabilityCheckCount = 0;
    const stabilityThreshold = 10;
function stabilityChecker() {
        if (isAnimationStable) return;
        const fps = Math.random() * 10 + 30;
        if (fps >= 30) { 
            stabilityCheckCount++;
            if (stabilityCheckCount >= stabilityThreshold) {
                isAnimationStable = true;
                endLoadingScreen();
            }
        } else stabilityCheckCount = 0;
        requestAnimationFrame(stabilityChecker);
    }
    stabilityChecker();
}
function endLoadingScreen() {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    animate();
}
const languageButtons = document.querySelectorAll('.language-option');
const buttonContainer = document.getElementById("buttonContainer");
const contentContainer = document.getElementById("contentContainer");
const currentLanguageIcon = document.getElementById('current-language-icon');
let currentOverlay = null;
fetch('./buttonsConfig.json')
  .then((response) => response.json())
  .then((configs) => {
    window.buttonsConfig = configs;
    configs.forEach((config) => {
      createButton(config);
    });
  });
function updateButtonTexts() {
    buttonsConfig.forEach(config => {
        const button = document.getElementById(config.id);
        if (button) {
            button.textContent = config.texts[currentLanguage] || config.texts.en;
            if (config.links) {
                button.href = config.links[currentLanguage] || config.links.en;
            } else {
                button.removeAttribute("href"); 
}}});}
function createButton(config) {
    const button = document.createElement("a");
    button.id = config.id;
    button.className = "menu-button";
    button.style.top = config.position.top;
    button.style.left = config.position.left;
    button.style.right = config.position.right;
    button.style.position = "absolute";
    button.textContent = config.texts[currentLanguage] || config.texts.en;
    if (config.links) {
      button.href = config.links[currentLanguage] || config.links.en;
    } else {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const contentFile = config.contentFile[currentLanguage] || config.contentFile.en;
        showContent(contentFile, config.contentPosition);
      });
    }
    buttonContainer.appendChild(button);
  }              
function showContent(contentFile, contentPosition) {
if (currentOverlay) {
  clearExistingContent(() => {
    loadContent(contentFile, contentPosition);
  });
} else {
  loadContent(contentFile, contentPosition);
}}

function loadContent(contentFile, contentPosition) {
fetch(contentFile)
  .then((response) => response.text())
  .then((htmlContent) => {
    const overlay = document.createElement("div");
    overlay.className = "content-overlay";
    overlay.style.pointerEvents = "auto";
    const contentBox = document.createElement("div");
    contentBox.className = "content-box";
    contentBox.style.left = contentPosition.left;
    contentBox.innerHTML = htmlContent;
    
    contentBox.addEventListener("click", (event) => {
        event.stopPropagation();
    })
    const closeButton = document.createElement("button");
    closeButton.textContent = "×";
    closeButton.style.fontSize = "15px";
    closeButton.className = "close-button";
    closeButton.addEventListener("click", (event) => {
      clearExistingContent();
    });

    const backToTopButton = document.createElement("button");
    backToTopButton.className = "content-back-to-top";
    backToTopButton.style.display = "none";
    backToTopButton.style.pointerEvents = "auto";
    backToTopButton.style.border = "none";
    backToTopButton.style.background = "transparent";
    backToTopButton.style.cursor = "pointer";
    backToTopButton.style.flexDirection = "column";
    backToTopButton.style.alignItems = "center";
    backToTopButton.style.justifyContent = "center";
    backToTopButton.style.textAlign = "center";
    const triangle = document.createElement("span");
    triangle.textContent = "▲";
    triangle.style.fontSize = "25px";
    triangle.style.lineHeight = "1";
    triangle.style.textAlign = "center";
    triangle.style.marginBottom = "5px";
    const text = document.createElement("span");
    text.textContent = "Scroll to Top";
    text.style.fontSize = "15px";
    text.style.textAlign = "center";
    backToTopButton.appendChild(triangle);
    backToTopButton.appendChild(text);
    backToTopButton.style.pointerEvents = "auto";
    backToTopButton.addEventListener("click", () => {
    contentBox.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    });
    contentBox.addEventListener("scroll", () => {
    if (contentBox.scrollTop > 200) {
        backToTopButton.style.display = "flex";
    } else {
        backToTopButton.style.display = "none";
    }
    });
    overlay.addEventListener("click", () => {
        clearExistingContent();
    });
    contentBox.appendChild(closeButton);
    contentBox.appendChild(backToTopButton);
    overlay.appendChild(contentBox);
    
    contentContainer.appendChild(overlay);
    currentOverlay = overlay;
    setTimeout(() => {
      overlay.classList.add("visible");
    }, 10);
  });
}
function clearExistingContent(callback) {
    if (currentOverlay) {
        contentContainer.removeChild(currentOverlay);
        currentOverlay = null;
    }
    if (callback) callback();
}
function updateLanguageIcon(language) {
    currentLanguageIcon.style.backgroundImage = `url(${flagImages[language]})`;
  }
languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentLanguage = button.getAttribute('data-lang') || "en";
        updateButtonTexts();
        updateLanguageIcon(currentLanguage);
    });});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(0, 0, 10).normalize();
scene.add(light);
let dustPlants = [];
let dustPlants2 = [];
let fallingFlowers = [];
let growingFlowers = [];
let growingFlowers2 = [];
let growingFlowers3 = [];
let growingFlowers4 = [];
let sideFlowers = [];
const cubes = [];
const flowerGroups = [
{ flowers: growingFlowers, maxScale: 8 },
{ flowers: growingFlowers2, maxScale: 8 },
{ flowers: growingFlowers3, maxScale: 8 },
{ flowers: growingFlowers4, maxScale: 8 },
{ flowers: sideFlowers, maxScale: 7 },
{ flowers: fallingFlowers, maxScale: 9 },
];
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
const MAX_SCROLL_SPEED = 4;
const MIN_SCROLL_SPEED = -4;
let lastTouchY = 0;
let lastTouchX = 0;
let autoSpeed = 1;
let scrollSpeed = 0 ;
let currentZ = 0;
let lastMouseY = 0;
const topflower = 0 ;
camera.position.x = 0
camera.position.y = 0
camera.position.z = 0;
let cameraZ = 0;
let lastCameraZ = 0;
let startX = 0;
let startY = 0;
let firstcount = 0;
const renderRange = { zMin: -80, zMax:30};
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
const maxTilt = Math.PI / 3 + (posY + 40) / 80;
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
const maxTilt = - Math.PI / 4 + (posY + 40) / 50;
const minTilt = - Math.PI / 8 + (posY + 40) / 200;
sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt + 25 ;
growingFlowers4.push(sprite);
scene.add(sprite);
}}}}

function createDustSprites(textureArray, startZ, endZ, dustList) {
    for (let x = -20; x < 20; x += 5) {
        for (let z = startZ; z < endZ; z += 10) {
            const textureUrl = textureArray[Math.floor(Math.random() * textureArray.length)];
            const cachedTexture = textureCache.get(textureUrl);
            if (cachedTexture) {
                const material = new THREE.SpriteMaterial({ map: cachedTexture });
                const sprite = new THREE.Sprite(material);
                const posX = x + random_1 + 5;
                const posY = Math.random() * 50 - (textureArray === textures.fallingTextures2 ? 0 : 15);
                const posZ = z + Math.random() * (textureArray === textures.fallingTextures2 ? 10 : 2);
                if(posZ>50 || posZ<-50){
                sprite.position.set(posX, posY, posZ);
                sprite.scale.set(scale, scale, 1);
                }

                const maxTilt = Math.PI / 5 + (posY + 40) / 80;
                const minTilt = Math.PI / 8 + (posY + 40) / 200;
                sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;

                if (Math.random() <= 0.2) {
                    if(posZ>70 || posZ<-70){
                            dustList.push(sprite);
                            scene.add(sprite);
                }

                    setTimeout(() => {
                        scene.remove(sprite);
                        dustList = dustList.filter(f => f !== sprite);
                    }, Math.random() * 5000 + 1000);
}}}}}
function dustFlowers(startZ, endZ) {
    createDustSprites(textures.dustTextures, startZ, endZ, dustPlants);
}
function dustFlowers2(startZ, endZ) {
    createDustSprites(textures.fallingTextures2, startZ, endZ, dustPlants2);
}
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
const objectLists = [growingFlowers, growingFlowers2,growingFlowers3,growingFlowers4,fallingFlowers, sideFlowers,dustPlants,dustPlants2];
objectLists.forEach(list => removeObjectsOutOfRange(list, zMin, zMax));
}
function update() {
const cameraZ = camera.position.z;
if (Math.abs(cameraZ - lastCameraZ) > shiftThreshold) {
    const shiftAmount = cameraZ - lastCameraZ;
    renderRange.zMin += shiftAmount;
    renderRange.zMax += shiftAmount;
    if (shiftAmount > 0) {
        createtopGround(renderRange.zMax - shiftAmount, renderRange.zMax);
        createGround(renderRange.zMax - shiftAmount, renderRange.zMax);
        createGround_right(renderRange.zMax - shiftAmount, renderRange.zMax);
        createGround_left(renderRange.zMax - shiftAmount, renderRange.zMax);
    }
    else{
        createtopGround(renderRange.zMin, renderRange.zMin - shiftAmount);
        createGround(renderRange.zMin, renderRange.zMin - shiftAmount);
        createGround_left(renderRange.zMin, renderRange.zMin - shiftAmount);
        createGround_right(renderRange.zMin, renderRange.zMin - shiftAmount);
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
removeFlowersOutOfRange(renderRange.zMin , renderRange.zMax );
dustupFlowers();
dustdownFlowers();
update();
if(Math.random()<=0.05){
createpinkFlowers_right(renderRange.zMin, renderRange.zMax);
createpinkFlowers_left(renderRange.zMin, renderRange.zMax);
createwhiteFlowers_right(renderRange.zMin, renderRange.zMax);
createwhiteFlowers_left(renderRange.zMin, renderRange.zMax);
creategroundFlowers(renderRange.zMin, renderRange.zMax);
createtopFlowers(renderRange.zMin, renderRange.zMax);
if(Math.random()<=0.4){
dustFlowers(renderRange.zMin, renderRange.zMax);
    if(Math.random()<=0.3){
dustFlowers2(renderRange.zMin, renderRange.zMax);
}}}
if(Math.random()<=0.1) growAllFlowers();
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
const maxYRotation = 1.9; 
const minYRotation = -1.9; 
const maxXRotation = Math.PI / 4;
const minXRotation = -Math.PI / 4;
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
      if (event.touches.length === 2){
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const touchX = (touch1.clientX + touch2.clientX) / 2;
            const touchY = (touch1.clientY + touch2.clientY) / 2;
            const distance = Math.sqrt(
                (touch1.clientX - touch2.clientX) ** 2 +
                (touch1.clientY - touch2.clientY) ** 2
            );
            let lastDistance = distance;
            if (lastDistance !== null) {
                const deltaDistance = distance - lastDistance;
                scrollSpeed += deltaDistance * 0.05;
                scrollSpeed = Math.max(MIN_SCROLL_SPEED, Math.min(MAX_SCROLL_SPEED, scrollSpeed));
                growAllFlowers();
            }
            lastDistance = distance;
            lastTouchX = touchX;
            lastTouchY = touchY;
      }
}}
function onTouchEnd() {
  lastTouchX = null;
  lastTouchY = null;
}
document.addEventListener("touchmove", onTouchMove, { passive: false });
document.addEventListener("touchend", onTouchEnd);
document.addEventListener("touchcancel", onTouchEnd);

const audioElement = document.getElementById("backgroundAudio");
const audiobutton = document.getElementById("audioControlButton");
const icon = document.getElementById("audioIcon");
icon.src = "./flag/soundoff.webp";
audiobutton.style.pointerEvents = "auto";
audiobutton.addEventListener("click", () => {
  if (audioElement.muted) {
    audioElement.muted = false;
    icon.src = "./flag/soundon.webp";
  } else {
    audioElement.muted = true;
    audioElement.pause();
    icon.src = "./flag/soundoff.webp";
  }
  audioElement.play();
});