const language = "en";
let currentLanguage = language;
const flagImages = {
    en: './flag/USA.webp',
    ja: './flag/Japan.webp',
    fr: './flag/France.webp',
    zh: './flag/China.webp'
}
const textures = {
    dustTextures: [
    "./flower/dust.webp",
    ],
    orangeTextures : [
    "./flower/1.webp",
    "./flower/7.webp",
    "./flower/9.webp",
    "./flower/11.webp",
    ],
    fallingTextures2 : [
    "./flower/2.webp",
    "./flower/5.webp",
    "./flower/373.webp",
    ],
    whiteTextures : [
    "./flower/3.webp",
    "./flower/4.webp",
    "./flower/6.webp",
    ],
    blueTextures : [
    "./flower/124.webp",
    "./flower/127.webp",
    "./flower/128.webp",
    "./flower/202.webp",
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
        const progress = (itemsLoaded / itemsTotal) * 100;
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

fetch('./content/buttonsConfig.json')
  .then((response) => response.json())
  .then((configs) => {
    window.buttonsConfig = configs; // Make it globally accessible
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
    overlay.addEventListener("click", clearExistingContent);

    const contentBox = document.createElement("div");
    contentBox.className = "content-box";
    contentBox.style.left = contentPosition.left;
    contentBox.innerHTML = htmlContent;

    const closeButton = document.createElement("button");
    closeButton.textContent = "✖";
    closeButton.className = "close-button";
    closeButton.addEventListener("click", (event) => {
      clearExistingContent();
    });

    contentBox.appendChild(closeButton);
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

const flowerGroups = [
{ flowers: growingFlowers, maxScale: 8 },
{ flowers: growingFlowers2, maxScale: 8 },
{ flowers: growingFlowers3, maxScale: 8 },
{ flowers: growingFlowers4, maxScale: 8 },
{ flowers: sideFlowers, maxScale: 7 },
{ flowers: fallingFlowers, maxScale: 9 },
];

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
                
                sprite.position.set(posX, posY, posZ);
                sprite.scale.set(scale, scale, 1);

                const maxTilt = Math.PI / 4 + (posY + 40) / 50;
                const minTilt = Math.PI / 8 + (posY + 40) / 200;
                sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;

                if (Math.random() <= 0.2) {
                    dustList.push(sprite);
                    scene.add(sprite);

                    setTimeout(() => {
                        scene.remove(sprite);
                        dustList = dustList.filter(f => f !== sprite);
                    }, Math.random() * 5000 + 10000);
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
}
if(Math.random()<=0.02) growAllFlowers();
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
}}
function onTouchEnd() {
  lastTouchX = null;
  lastTouchY = null;
}
document.addEventListener("touchmove", onTouchMove, { passive: false });
document.addEventListener("touchend", onTouchEnd);
document.addEventListener("touchcancel", onTouchEnd);
