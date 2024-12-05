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
    "./flower/5.webp",
    "./flower/373.webp",
    ],
    whiteTextures : [
    "./flower/3.webp",
    "./flower/4.webp",
    "./flower/6.webp",
    ],
    blueTextures : [
    "https://dl.dropboxusercontent.com/scl/fi/ce86jbgb3vqrxa51gfvgc/plant_precise_128.webp?rlkey=k9ium3e2xkrzslqsba4p23f60",
    "https://dl.dropboxusercontent.com/scl/fi/5xaziuy55562qr6estl48/plant_precise_124.webp?rlkey=j5ixogfh9pcvm82stwd8oeinu",
    "https://dl.dropboxusercontent.com/scl/fi/3xrdiqdiukdt61wyzu94u/plant_precise_214.webp?rlkey=qh7r9zu0lm7ikkcmkco9zzfll",
    "https://dl.dropboxusercontent.com/scl/fi/bkhgu2bhxw8p02jb2oxx4/plant_precise_220.webp?rlkey=t5z4yeghbvjr9oa8flk973tjp",
       ],
    pinkTextures : [
    "https://dl.dropboxusercontent.com/scl/fi/lwf95owio93ahgi144nmi/plant_precise_258.webp?rlkey=9d2njke0pmcq0jjxmnuph4vms",
    "https://dl.dropboxusercontent.com/scl/fi/5jb6gab456rg8kyb60siv/plant_precise_261.webp?rlkey=qy9i3w3mvgeond1h3kslxhkxy",
    "https://dl.dropboxusercontent.com/scl/fi/tyl4qwn50dvntwiheewv7/plant_precise_263.webp?rlkey=zhtn1a0ir95dtax6v9kx6s3t7",
    "https://dl.dropboxusercontent.com/scl/fi/0hfd2ow2kuz8zhqlj5by2/plant_precise_266.webp?rlkey=r0rbgtq41xdkmeyr913b6uzgb",
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
const buttonsConfig = [
    {
        id: "About Me",
        texts: { en: "About Me", ja: "自己紹介", fr: "Qui suis-je", zh: "关于我" },
        position: { top: "40%", left: `20%` },
        contentPosition:  {left: "0%", right: "0%" },
        content: {
            en:`
            <div class="container" style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; max-width: 800px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                <div class="about-section" style="display: flex; margin-bottom: 40px;">
                    <div class="about-text" style="flex: 2; padding-left: 10px;">
                        <h2 style="font-size: 20px; color: #ffffff; border-bottom: 2px solid #ff7f50; display: inline-block; padding-bottom: 4px;">YASU(CIAO)</h2>
                        <p class="roles" style="font-family: 'Cambria', 'Baskerville', serif; color: #ffffff; margin-top: 8px;">Role = [Data Scientist, Health Professional, EdTech Specialist, Graphic Designer]</p>
                        <p style="margin-top: 12px;">My name, Yasu (康), originates from Japanese and symbolizes the process of threshing a plentiful harvest of rice. It conveys meanings of peace, health, and joy. A dedicated individual pursuing activities connected to "Healthcare" and "Happiness" since the age of 13. I engage in projects across diverse fields, including as a Data Scientist, DevOps Engineer, and Graphic Designer. I aim to be the first discoverer of possibilities by focusing on the diversity between people and things. My hobbies are playing tennis and reading books, especially novels and self-help.</p>
                    </div>
                </div>
            </div>
            <div class="image-section" style="display: flex; justify-content: space-evenly; margin-bottom: 20px;">
                <img src="./Ciao.webp" alt="Profile photo" style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #ddd;">
            </div>
            <div class="faq-section">
                <h2 style="font-size: 20px; color: #ffffff; border-bottom: 2px solid #ff7f50; display: inline-block; padding-bottom: 4px;">Frequently Asked Questions（FAQs）</h2>
                <div class="faq-item" style="margin-top: 16px; padding: 10px; border: 1px solid #ff7f50; border-radius: 8px;">
                    <h3 style="font-size: 18px; color: #ffffff; margin-bottom: 8px;">Q: Was your name an inspiration?</h3>
                    <p style="font-size: 14px; color: #ffffff;">The inspiration came during the global outbreak of COVID-19 when I was 20 years old. My 10 years of volunteer work until university graduation also played a role. I believe the saying "A name reflects one's essence" fits perfectly.</p>
                </div>
                <div class="faq-item" style="margin-top: 16px; padding: 10px; border: 1px solid #ff7f50; border-radius: 8px;">
                    <h3 style="font-size: 18px; color: #ffffff; margin-bottom: 8px;">Q: What does health mean to you?</h3>
                    <p style="font-size: 14px; color: #ffffff;">Health is the ability to envision how to live life and engage with things. While the WHO's definition of "A state of complete physical, mental, and social well-being" is abstract, I believe it remains relevant across all times as it represents what we truly desire.</p>
                </div>
            </div>
        </div>
        `,
            ja:`
            <div class="container" style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; max-width: 800px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            <div class="about-section" style="display: flex; align-items: center; margin-bottom: 40px;">
                <div class="about-text" style="flex: 2; padding-left: 10px;">
                    <h1 style="font-size: 24px; color: #ffffff; border-bottom: 2px solid #ff7f50; display: inline-block; padding-bottom: 4px;">ヤスヒロ<br>(チャオ)</h1>
                    <p class="roles" style="font-size: 14px; font-family: 'Cambria', 'Baskerville', serif; color: #ffffff; margin-top: 8px;">データサイエンティスト, 医療・公共事業戦略, 遠隔教育, グラフィックデザイナー</p>
                    <p style="margin-top: 12px;">13歳から「健」や幸せに繋がる活動を続けてきた鹿。データサイエンティスト・DevOpsエンジニアの他、グラフィックデザイナーとして幅広い分野でプロジェクトに携わる。ヒトやモノの間にある多様性に注目し、それぞれの可能性を見つけ出す第一発見者でありたいと考えている。趣味は、テニスと読書。</p>
                </div>
            </div>
            <div class="image-section" style="display: flex; justify-content: space-evenly; margin-bottom: 20px;">
                <img src="./Ciao.webp" alt="Profile photo" style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #ddd;">
            </div>
            <div class="faq-section">
                <h2 style="font-size: 20px; color: #ffffff; border-bottom: 2px solid #ff7f50; display: inline-block; padding-bottom: 4px;">よくあるご質問</h2>
                <div class="faq-item" style="margin-top: 16px; padding: 10px; border: 1px solid  #ff7f50; border-radius: 8px;">
                    <h3 style="font-size: 18px; color: #ffffff; margin-bottom: 8px;">Q: きっかけは、名前が由来か</h3>
                    <p style="font-size: 14px; color: #ffffff;">20歳の時に経験した、新型コロナウイルスの世界的大流行がきっかけです。また大学卒業までの10年間ボランティア活動に取り組んできたことも影響ある。「名は体を表す」という言葉がぴったりだと考えた。</p>
                </div>
                <div class="faq-item" style="margin-top: 16px; padding: 10px; border: 1px solid  #ff7f50; border-radius: 8px;">
                    <h3 style="font-size: 18px; color: #ffffff; margin-bottom: 8px;">Q: あなたにとって、健康とは</h3>
                    <p style="font-size: 14px; color: #ffffff;">人生をどう生き、物事にどう関わるか思い描けること。肉体的・精神的・社会的に、「よい状態」というWHO憲章の定義は抽象的だが、どんな時代にあっても、私たちが望んでいることに変わりはないと思う。</p>
                </div>
            </div>
        </div>
        `,
        fr:`
        <div class="container" style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; max-width: 800px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        <div class="about-section" style="display: flex; align-items: center; margin-bottom: 40px;">
            <div class="about-text" style="flex: 2; padding-left: 10px;">
                <h1 style="font-size: 24px; color: #ffffff; border-bottom: 2px solid #ff7f50; display: inline-block; padding-bottom: 4px;">YASU(CIAO)</h1>
                <p class="roles" style="font-size: 14px; font-family: 'Cambria', 'Baskerville', serif; color: #ffffff; margin-top: 8px;">Rôle = [Data Scientist, Professionnel de la santé, Spécialiste ETech, Designer graphique]</p>
                <p style="margin-top: 12px;">Mon prénom, Yasu (康), provient du japonais et symbolise le processus de battage d'une récolte abondante de riz. Il évoque la paix, la santé et la joie. Engagé dans des activités liées à la "santé" et au bonheur depuis l'âge de 13 ans. Je participe à des projets dans divers domaines, notamment en tant que Data Scientist, ingénieur DevOps et designer graphique. Mon objectif est d’être le premier à découvrir les possibilités en me concentrant sur la diversité entre les personnes et les choses. Mes passe-temps incluent le tennis et la lecture.</p>
            </div>
        </div>
        <div class="image-section" style="display: flex; justify-content: space-evenly; margin-bottom: 20px;">
            <img src="./Ciao.webp" alt="Profile photo" style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #ddd;">
        </div>
        <div class="faq-section">
            <h2 style="font-size: 20px; color: #ffffff; border-bottom: 2px solid #ff7f50; display: inline-block; padding-bottom: 4px;">Questions fréquemment posées</h2>
            <div class="faq-item" style="margin-top: 16px; padding: 10px; border: 1px solid  #ff7f50; border-radius: 8px;">
                <h3 style="font-size: 18px; color: #ffffff; margin-bottom: 8px;">Q : Votre nom a-t-il été une source d'inspiration ?</h3>
                <p style="font-size: 14px; color: #ffffff;">L'inspiration est venue lors de la pandémie mondiale de COVID-19, alors que j'avais 20 ans. Mes 10 années de travail bénévole avant la fin de mes études universitaires ont également joué un rôle. Je pense que le dicton "le nom reflète l'essence d'une personne" convient parfaitement.</p>
            </div>
            <div class="faq-item" style="margin-top: 16px; padding: 10px; border: 1px solid  #ff7f50; border-radius: 8px;">
                <h3 style="font-size: 18px; color: #ffffff; margin-bottom: 8px;">Q : Que signifie la santé pour vous ?</h3>
                <p style="font-size: 14px; color: #ffffff;">La santé, c'est la capacité d'imaginer comment vivre sa vie et s'engager dans les choses. Bien que la définition de l'OMS, "un état de bien-être complet physique, mental et social", soit abstraite, je pense qu'elle reste pertinente à toutes les époques, car elle représente ce que nous désirons vraiment.</p>
            </div>
        </div>
        </div>
        `,
        zh:`
        <div class="container" style="font-family: Arial, sans-serif; line-height: 1.6; color: #ffffff; max-width: 800px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        <div class="about-section" style="display: flex; align-items: center; margin-bottom: 40px;">
            <div class="about-text" style="flex: 2; padding-left: 10px;">
                <h1 style="font-size: 24px; color: #ffffff; border-bottom: 2px solid #ff7f50; display: inline-block; padding-bottom: 4px;">>康(YASU)</h1>
                <p class="roles" style="font-size: 14px; font-family: 'Cambria', 'Baskerville', serif; color: #ffffff; margin-top: 8px;">角色 = [数据科学家，健康专业人士，教育科技专家，平面设计师]</p>
                <p style="margin-top: 12px;">我的名字Yasu（康）源自日语，象征着脱谷丰收的稻米。这名字代表了平安、健康和喜悦的意义。 从13岁起，我就致力于与“健康”和幸福相关的活动。我参与了多个领域的项目，包括作为数据科学家、DevOps工程师和平面设计师。我希望通过关注人和事物之间的多样性，成为发现潜力的第一人。我的爱好包括网球和阅读。</p>
            </div>
        </div>
        <div class="image-section" style="display: flex; justify-content: space-evenly; margin-bottom: 20px;">
            <img src="./Ciao.webp" alt="Profile photo" style="width: 150px; height: 150px; border-radius: 50%; border: 4px solid #ddd;">
        </div>
        <div class="faq-section">
            <h2 style="font-size: 20px; color: #ffffff; border-bottom: 2px solid #ff7f50; display: inline-block; padding-bottom: 4px;">常见问题</h2>
            <div class="faq-item" style="margin-top: 16px; padding: 10px; border: 1px solid  #ff7f50; border-radius: 8px;">
                <h3 style="font-size: 18px; color: #ffffff; margin-bottom: 8px;">问：您的名字是灵感的来源吗？</h3>
                <p style="font-size: 14px; color: #ffffff;">灵感来源于我20岁时经历的新冠病毒全球大流行。此外，我在大学毕业之前的10年间一直参与志愿者活动。我认为“名副其实”这个说法非常贴切。</p>
            </div>
            <div class="faq-item" style="margin-top: 16px; padding: 10px; border: 1px solid  #ff7f50; border-radius: 8px;">
                <h3 style="font-size: 18px; color: #ffffff; margin-bottom: 8px;">问：健康对您来说意味着什么？</h3>
                <p style="font-size: 14px; color: #ffffff;">健康是能够想象如何生活以及如何参与事物的能力。虽然世界卫生组织对“身体、心理和社会的完全健康状态”的定义较为抽象，但我认为这一愿望在任何时代都没有改变，因为它代表了我们真正的追求。</p>
            </div>
        </div>
        </div>
        `,
        }
    },
    {
        id: "Contact",
        texts: { en: "Contact", ja: "連絡先", fr: "Contact", zh: "联系我们" },
        position: { top: "50%", left: "20%" },
        contentPosition: { left: "0%" ,right: "0%"},
        content:{
        en: `
            <body style="font-family: Arial, serif; text-align: center;">
                <h3 style="margin-top: 20px;">A Closer Look at Yasu ≫</h3>
            <div style="position: relative; background-color: #405de6;  padding: 20px; overflow-x: auto; white-space: nowrap; scrollbar-gutter: stable;">

        <div style="display: flex; justify-content: left; align-items: left; gap: 30px; padding: 10px; box-sizing: border-box;">
            <a href="https://www.figma.com/@ciao521" aria-label="Figma Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Figma.webp" alt="Visit Yasu's Figma" style="width: 50px; height: 50px;">
            </a>
            <a href="https://github.com/Yasu521" aria-label="GitHub Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/github.webp" alt="GitHub Profile" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.kaggle.com/" aria-label="Kaggle" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Kaggle.webp" alt="Visit Yasu's Kaggle" style="width: 50px; height: 50px;">
            </a>
            <a href="https://medium.com/@ciao_521" aria-label="Medium" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Medium.webp" alt="Visit Yasu's Medium" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.linkedin.com/in/yasuhiroiwai521/" aria-label="LinkedIn Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/LinkedIn.webp" alt="LinkedIn Profile" style="width: 50px; height: 50px;">
            </a>
                </div>
            </div>
                <div style="margin-top: 30px;">
                    <h3>⥥ Request Information</h3>
                    <p>
                        <a href="mailto:iwaiyasuhiro0521@gmail.com" style="text-decoration: none; color: inherit;">
                            [Mail]<br>iwaiyasuhiro0521@gmail.com
                        </a>
                    </p>
                     <p style="font-size: 10px; text-decoration: underline; text-decoration-color: #f0e68c; text-underline-offset: 4px; font-family: 'Cambria', 'Baskerville', serif;">Do Not Sell My Personal Information</p>
                </div>

            </body>

        `,
        ja:`
            <body style="font-family: Arial, serif; text-align: center; margin: 0;">

            <h3 style="margin-top: 20px; text-align: left; color: white;">ながめる ≫ つながる</h3>
            <div style="position: relative; background-color: #405de6;  padding: 20px; overflow-x: auto; white-space: nowrap; scrollbar-gutter: stable;">
        <div style="display: flex; justify-content: left; align-items: left; gap: 30px; padding: 10px; box-sizing: border-box;">
            <a href="https://www.figma.com/@ciao521" aria-label="Figma Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Figma.webp" alt="Visit Yasu's Figma" style="width: 50px; height: 50px;">
            </a>
            <a href="https://github.com/Yasu521" aria-label="GitHub Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/github.webp" alt="GitHub Profile" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.duolingo.com/profile/ciao_521" aria-label="Dolingo" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Duolingo.webp" alt="Dolingo Jarney" style="width: 50px; height: 50px;">
            </a>
            <a href="https://note.com/ciao521/" aria-label="Note Blog" rel="noopener noreferrer" target="_blank">
                <img src="./sns/note.webp" alt="Note Blog" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.instagram.com/ciao_521/" aria-label="Instagram Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Instagram.webp" alt="Instagram Profile" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.linkedin.com/in/yasuhiroiwai521/" aria-label="LinkedIn Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/LinkedIn.webp" alt="LinkedIn Profile" style="width: 50px; height: 50px;">
            </a>
        </div>
    </div>
                <div style="margin-top: 30px;">
                    <h3>⥥ お問い合わせ</h3>
                    <p>
                        <a href="mailto:iwaiyasuhiro0521@gmail.com" style="text-decoration: none; color: inherit;">
                            [メール]<br>iwaiyasuhiro0521@gmail.com
                        </a>
                    </p>
                    <p style="font-size: 10px; text-decoration: underline; text-decoration-color: #f0e68c; text-underline-offset: 4px; font-family: 'Cambria', 'Baskerville', serif;">私の個人データを販売しないでください</p>
                </div>

            </body>
        `,
        fr:`
        <body style="font-family: Arial, serif; text-align: center;">
            <h3 style="margin-top: 20px;">Un Regard Approfondi sur Yasu ≫</h3>
            <div style="position: relative; background-color: #405de6;  padding: 20px; overflow-x: auto; white-space: nowrap; scrollbar-gutter: stable;">
        <div style="display: flex; justify-content: left; align-items: left; gap: 30px; padding: 10px; box-sizing: border-box;">
            <a href="https://www.figma.com/@ciao521" aria-label="Figma Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Figma.webp" alt="Visit Yasu's Figma" style="width: 50px; height: 50px;">
            </a>
            <a href="https://github.com/Yasu521" aria-label="GitHub Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/github.webp" alt="GitHub Profile" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.kaggle.com/" aria-label="Kaggle" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Kaggle.webp" alt="Visit Yasu's Kaggle" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.duolingo.com/profile/ciao_521" aria-label="Dolingo" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Duolingo.webp" alt="Dolingo Jarney" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.linkedin.com/in/yasuhiroiwai521/" aria-label="LinkedIn Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/LinkedIn.webp" alt="LinkedIn Profile" style="width: 50px; height: 50px;">
            </a>
                </div>
            </div>
                <div style="margin-top: 30px;">
                    <h3>⥥ Demande d'informations </h3>
                    <p>
                        <a href="mailto:iwaiyasuhiro0521@gmail.com" style="text-decoration: none; color: inherit;">
                            [Message]<br>iwaiyasuhiro0521@gmail.com
                        </a>
                    </p>
                    <p style="font-size: 10px; text-decoration: underline; text-decoration-color: #f0e68c; text-underline-offset: 4px; font-family: 'Cambria', 'Baskerville', serif;">Veuillez ne pas vendre mes données personnelles</p>

                </div>

            </body>
        `,
        zh:`
                <body style="font-family: Arial, serif; text-align: center;">
            <h3 style="margin-top: 20px;">深入了解 "康" ≫</h3>
            <div style="position: relative; background-color: #405de6;  padding: 20px; overflow-x: auto; white-space: nowrap; scrollbar-gutter: stable;">
        <div style="display: flex; justify-content: left; align-items: left; gap: 30px; padding: 10px; box-sizing: border-box;">
            <a href="https://www.figma.com/@ciao521" aria-label="Figma Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Figma.webp" alt="Visit Yasu's Figma" style="width: 50px; height: 50px;">
            </a>
            <a href="https://github.com/Yasu521" aria-label="GitHub Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/github.webp" alt="GitHub Profile" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.kaggle.com/" aria-label="Kaggle" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Kaggle.webp" alt="Visit Yasu's Kaggle" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.instagram.com/ciao_521/" aria-label="Instagram Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/Instagram.webp" alt="Instagram Profile" style="width: 50px; height: 50px;">
            </a>
            <a href="https://www.linkedin.com/in/yasuhiroiwai521/" aria-label="LinkedIn Profile" rel="noopener noreferrer" target="_blank">
                <img src="./sns/LinkedIn.webp" alt="LinkedIn Profile" style="width: 50px; height: 50px;">
            </a>
                </div>
            </div>
                <div style="margin-top: 30px;">
                    <h3>⥥ 咨询请求 </h3>
                    <p>
                        <a href="mailto:iwaiyasuhiro0521@gmail.com" style="text-decoration: none; color: inherit;">
                            [邮箱]<br>iwaiyasuhiro0521@gmail.com
                        </a>
                    </p>
                    <p style="font-size: 10px; text-decoration: underline; text-decoration-color: #f0e68c; text-underline-offset: 4px; font-family: 'Cambria', 'Baskerville', serif;">请勿出售我的个人信息</p>
                </div>
            </body>
        `
        ,}},
    {
        id: "Project",
        texts: { en: " Projects", ja: "活動", fr: "Projets", zh: "项目" },
        //links: { en: "https://aicurion.com/project-ja", ja:"https://aicurion.com/project-ja", fr: "https://aicurion.com/project-ja", zh:"https://aicurion.com/project-ja" },
        position: { top: "60%", left: "20%" },
        contentPosition: { left: "0%", right: "0%" },
        content: {
        en:`
            <h2>Projects</h2>
            <p>Here are some of my projects:</p>
            <img src="https://via.placeholder.com/150/0000FF/808080?text=Projects" alt="Projects" style="width:150px;">
            <p><a href="https://aicurion.com/project-ja" target="_blank">See Projects</a></p>
        `,
        ja:`
         <h2>自己紹介</h2>
                <p>こちらは自己紹介セクションです！</p>
                <img src="https://via.placeholder.com/150" alt="自己紹介" style="width:150px;">
                <p><a href="https://aicurion.com/aboutme-ja" target="_blank">もっと知る</a></p>
        `,
        }
    },
    {
        id: "News",
        texts: { en: "News", ja: "お知らせ", fr: "Nouvelles", zh: "消息" },
        //links: { en: "https://example.com/contact-en", ja: "https://example.com/contact-ja", fr: "https://example.com/contact-fr", zh: "https://example.com/contact-zh" },
        position: { top: "70%", left: "20%" },
        contentPosition: { left: "0%", right: "0%" },
        content:{
        en:`
            <h2>News</h2>
            <p>Latest news updates:</p>
            <img src="https://via.placeholder.com/150/FF0000/FFFFFF?text=News" alt="News" style="width:150px;">
            <p><a href="https://example.com/news-en" target="_blank">Read News</a></p>
        `,
        ja:`
         <h2>自己紹介</h2>
                <p>こちらは自己紹介セクションです！</p>
                <img src="https://via.placeholder.com/150" alt="自己紹介" style="width:150px;">
                <p><a href="https://aicurion.com/aboutme-ja" target="_blank">もっと知る</a></p>
        `,
        }
    },
];

let currentOverlay = null;
function updateButtonTexts() {
    buttonsConfig.forEach(config => {
        const button = document.getElementById(config.id);
        if (button) {
            button.textContent = config.texts[currentLanguage] || config.texts.en;
            if (config.links) {
                button.href = config.links[currentLanguage] || config.links.en;
                button.target = "_blank";
            } else {
                button.removeAttribute("href"); 
            }}});}

buttonsConfig.forEach(config => {
    const button = document.createElement("a");
    button.id = config.id;
    button.className = "menu-button";
    button.style.top = config.position.top;
    button.style.left = config.position.left;
    button.style.position = "absolute";
    button.textContent = config.texts[currentLanguage];
    if (config.links && config.links[currentLanguage]) {
        button.href = config.links[currentLanguage];
        button.target = "_blank";
    } else {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            showContent(config.content[currentLanguage] || config.content.en, config.contentPosition);
        });}
    buttonContainer.appendChild(button);
});
function showContent(content, contentPosition) {
    if (currentOverlay) {
        clearExistingContent(() => {
            createContent(content, contentPosition);
        });
    } else {
        createContent(content, contentPosition);
    }}
function createContent(content, contentPosition) {
    const overlay = document.createElement("div");
    overlay.className = "content-overlay";
    overlay.addEventListener("click", clearExistingContent);
    const contentBox = document.createElement("div");
    contentBox.className = "content-box";
    contentBox.style.left = contentPosition.left;
    contentBox.innerHTML = content;
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
updateLanguageIcon(currentLanguage);


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
