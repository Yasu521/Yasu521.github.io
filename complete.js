<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Ciao:Yasu521}</title>

  <style>
    /* 全体のリセット */
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
    }
    /* 画像ボタンのスタイル */
    #audioControlButton {
      position: fixed; /* 画面の端に固定 */
      
      background-color: #ffffff; /* ボタンの背景色 */
      top: 13px; /* 上端からの距離 */
      right: 60px; /* 右端からの距離 */
      width: 30px; /* ボタンの幅 */
      border-radius: 50%; /* 丸くする */
      cursor: pointer; /* ポインタカーソル */
      height: 30px; /* ボタンの高さ */
      cursor: pointer; /* ポインタカーソル */
      z-index: 10; /* 他の要素より上に表示 */
    }

    #audioControlButton img {
      width: 100%;
      height: 100%;
      object-fit: contain; /* 画像の比率を保持して調整 */
    }

    /* オーディオを非表示 */
    audio {
      display: none;
    }
    /* ぼかしオーバーレイ */
    .blur-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* ユーザー操作を妨げない */
    background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.7) 50%, rgb(0, 0, 0) 100%);
    backdrop-filter: blur(0.5px); /* ぼかしの強さを調整 */
    }
    .language-menu {
        position: absolute;
        top: 10px;
        right: 10px;
        display: inline-block;
    }
    .language-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px; /* アイコンサイズ */
        height: 35px; /* アイコンサイズ */
        border-radius: 50%; /* 円形 */
        background-image: url('https://dl.dropboxusercontent.com/scl/fi/wwqqmcio1p1tsck22czrq/7592.png?rlkey=2kz87faydbpnjmv1m4fi8fjzi');
        background-size: cover; /* 背景画像のサイズ調整 */
        background-position: center; /* 背景画像の位置調整 */
        overflow: hidden; /* アイコンがはみ出さないようにする */
    }
    .language-list {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 5px;
        overflow: hidden;
        z-index: 1000;
    }
    .language-option {
        background: none;
        border: none;
        color: white;
        padding: 1px 1px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.3s;
    }
    .language-option:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    .language-option.selected {
        font-style: italic;
    }
    .language-menu:hover .language-list {
        display: block;
    }

    .menu-button {
            position: absolute;
            display: inline-block;
            text-decoration: none;
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            background: rgba(0, 0, 0, 0.7,0);
            transition: all 0.3s ease;
            overflow: hidden;
            text-align: center;
        }

        .menu-button:hover {
            color: white;
            background: rgba(0, 0, 0, 0.5);
        }

        .menu-button::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0;
            height: 3px;
            background: white;
            transition: width 0.3s ease;
        }

        .menu-button:hover::after {
            width: 100%;
        }
  </style>

</head>

<body>

  <!-- Three.js レンダリング領域 -->
  <canvas id="three-canvas"></canvas>
  <!-- ぼかしエフェクトオーバーレイ -->
  <div class="blur-overlay"></div>
    <!-- オーディオ要素 -->
    <audio id="backgroundAudio" muted loop>
        <source src="https://dl.dropboxusercontent.com/scl/fi/4p969qczh64dl244yas3d/Debussy-Arabesque-No.1-and-No.2.mp3?rlkey=e1todwphjjr50plud8vpp02me" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>

    <!-- ボタン -->
    <div id="audioControlButton">
        <img id="audioIcon" src="https://dl.dropboxusercontent.com/scl/fi/kjakxmywwrmzstaluoe6g/soundon.png?rlkey=i0qm0ee92nc9aw5xszz5u3kjt" alt="Audio Control">
    </div>

    <div class="language-menu">
        <button class="language-toggle"></button>
        <div class="language-list">
            <button class="language-option" data-lang="en">English</button>
            <button class="language-option" data-lang="fr">Français</button>
            <button class="language-option" data-lang="ja">日本語</button>
            <button class="language-option" data-lang="zh">中文</button>
        </div>
    </div>
    <!-- ボタンのコンテナ -->
    <div id="buttonContainer"></div>

  <!-- Three.js ライブラリ -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

  <!-- アニメーションスクリプト -->
<script>
    // 要素を取得
    const audioElement = document.getElementById("backgroundAudio");
    const button = document.getElementById("audioControlButton");
    const icon = document.getElementById("audioIcon");
    icon.src = "https://dl.dropboxusercontent.com/scl/fi/n3igqec4a5gspy8k8l6oq/soundoff.png?rlkey=6lh9mtawqbw2ymo5538bee0te"; // 初期状態の画像を設定
    audioElement.pause();
    button.addEventListener("click", () => {
      if (audioElement.muted) {
        audioElement.muted = false; // ミュート解除
        icon.src = "https://dl.dropboxusercontent.com/scl/fi/kjakxmywwrmzstaluoe6g/soundon.png?rlkey=i0qm0ee92nc9aw5xszz5u3kjt"; // 音声ONの画像に変更
      } else {
        audioElement.muted = true; // ミュート解除
        icon.src = "https://dl.dropboxusercontent.com/scl/fi/n3igqec4a5gspy8k8l6oq/soundoff.png?rlkey=6lh9mtawqbw2ymo5538bee0te"; // 音声OFFの画像に変更
      }
      audioElement.play();

    });

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

        const languageMessages = {
            en: "Language changed to English!",
            ja: "言語を日本語に変更しました！",
            fr: "Langue changée en Français !",
            zh: "语言已更改为中文！"
        };

        const buttonContainer = document.getElementById("buttonContainer");

        // ボタンを生成
        buttonsConfig.forEach(config => {
            const button = document.createElement("a");
            button.id = config.id;
            button.className = "menu-button";
            button.href = config.links.en; // デフォルトリンク
            button.textContent = config.texts.en; // デフォルトのボタンテキスト
            button.style.top = config.position.top;
            button.style.left = config.position.left;
            button.style.right = config.position.right;
            button.style.style = config.position.style;

            buttonContainer.appendChild(button);
        });

        const languageButtons = document.querySelectorAll('.language-option');

        // 言語ボタンのクリックイベント
        languageButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedLanguage = button.getAttribute('data-lang');

                // ボタンのテキストとリンクを更新
                buttonsConfig.forEach(config => {
                    const btn = document.getElementById(config.id);
                    btn.textContent = config.texts[selectedLanguage]; // 言語別テキスト
                    btn.href = config.links[selectedLanguage]; // 言語別リンク
                });

                // アラート表示
                alert(languageMessages[selectedLanguage]);
            });
        });
        document.addEventListener('DOMContentLoaded', () => {
        const toggleButton = document.querySelector('.language-toggle');
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedLang = e.target.getAttribute('data-lang');
                // 言語に対応した画像URL（仮の例）
                const langIcons = {
                    en: 'https://dl.dropboxusercontent.com/scl/fi/wwqqmcio1p1tsck22czrq/7592.png?rlkey=2kz87faydbpnjmv1m4fi8fjzi',
                    fr: 'https://dl.dropboxusercontent.com/scl/fi/qjaswgxqp6m07af0doc1j/7596.png?rlkey=pjcv2qioez0r034ea4iyndgl3&st=0t6mwxtk&dl=0',
                    ja: 'https://dl.dropboxusercontent.com/scl/fi/qnaqgpxi7sfdoxraomw6n/7591.png?rlkey=s4v0scvff2chpmjc3gc8hvgos',
                    zh: 'https://dl.dropboxusercontent.com/scl/fi/etl7rqlcpn25xe2ti6hl3/7607.png?rlkey=cp5edcvttjbaorwhz44cnpsps'
                };

                // アイコンを変更
                if (langIcons[selectedLang]) {
                    toggleButton.style.backgroundImage = `url(${langIcons[selectedLang]})`;
                    toggleButton.style.backgroundSize = 'cover';
                    toggleButton.style.backgroundPosition = 'center';
                    toggleButton.style.width = '35px'; // アイコンサイズ調整
                    toggleButton.style.height = '35px'; // アイコンサイズ調整
                    toggleButton.style.borderRadius = '50%'; // 円形にする
                    toggleButton.textContent = ''; // テキストを非表示
                }
            });
        });
    });

    // Three.jsのセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // ライト設定
    const light = new THREE.DirectionalLight(0xffffff, 10);
    light.position.set(0, 0, 10).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x305630, 2); // 柔らかい環境光
    ambientLight.position.set(0, 10, -10).normalize();
    scene.add(ambientLight);


    // Load Textures
    const dustTextures= [
    "https://dl.dropboxusercontent.com/scl/fi/sva9qrbssn69ay5ykc28o/dust.png?rlkey=8n0kkpdn0puu5ekdxsfdtnhtz"
    ]; 
    const orangeTextures = [
    "https://dl.dropboxusercontent.com/scl/fi/zyivghngvnfc71ikcafps/1.png?rlkey=3c4vsl45wo80qx7exeyzcuq4e",
    "https://dl.dropboxusercontent.com/scl/fi/yqmbt074l4qkg9xbo4iar/7.png?rlkey=fxe6tbwfgzdl4zysflmz7czal",
    "https://dl.dropboxusercontent.com/scl/fi/3n4vleq7xk60oz34ribb5/9.png?rlkey=5o9a13i8xysy681j0k76zv1ut",
    "https://dl.dropboxusercontent.com/scl/fi/vrta53tp1viw1fu16h2td/11.png?rlkey=jq7d7dyz8ek7wpercxvme44bj"// topflowers
    ];
    const fallingTextures2 = [
    "https://dl.dropboxusercontent.com/scl/fi/0wa6yxelpdercgik0u0j6/2.png?rlkey=k7e1754lx18hqd5j521ao4y87",
    "https://dl.dropboxusercontent.com/scl/fi/pcdzb2aqaqmm8ws974x1i/5.png?rlkey=fx3joybf5cr3i83nwogrvzv4o",
    "https://dl.dropboxusercontent.com/scl/fi/jv6ny1dh36v5fffqq08aw/plant_precise_123.png?rlkey=vp9xfp5bqoxhc1gwuk081n6wc",
    "https://dl.dropboxusercontent.com/scl/fi/lzg5fecuc6zkmpos8wsj9/plant_precise_213.png?rlkey=ire3jdvzuxpqqhsuggtoxnh89",
    // Falling plants
    ];
    const whiteTextures = [
    "https://dl.dropboxusercontent.com/scl/fi/zfnd4l56tfxkbtj9kdc9e/3.png?rlkey=prfaxcyukhmvmq0hwfe7ft27r",
    "https://dl.dropboxusercontent.com/scl/fi/0poeyuv7ixzkjwc1p480r/4.png?rlkey=2gymu5lpgega57bitk08k1ozv",
    "https://dl.dropboxusercontent.com/scl/fi/dl19zzqdjum88t3ixtpgk/6.png?rlkey=qp9ceajs61pk25ij86vq89pfd",
    //白
    ];
    const blueTextures = [
    "https://dl.dropboxusercontent.com/scl/fi/5scqus7wsfmzc7zmzpywl/plant_precise_128.png?rlkey=api5p4joynhvrlc7j5a1iuc7v",
    "https://dl.dropboxusercontent.com/scl/fi/o0z3jedp00h0m2ammrg7w/plant_precise_129.png?rlkey=c4321d422isk61n5oie909g0s",
    "https://dl.dropboxusercontent.com/scl/fi/qr8kqeoxkz3dm2rhn6jcr/plant_precise_130.png?rlkey=yfrun5y4qsifs8scqrkyr39f3",
    "https://dl.dropboxusercontent.com/scl/fi/2scrur6tzb5j43rk1fvwl/plant_precise_214.png?rlkey=dfziafr6i3jwckl80mmrei6q3",
    "https://dl.dropboxusercontent.com/scl/fi/qzoadtbtro8iwdky9meyj/plant_precise_216.png?rlkey=s9h9cj33eaefbnta0oidzvlut",
    "https://dl.dropboxusercontent.com/scl/fi/l87xs77jt4da78uxt37ae/plant_precise_220.png?rlkey=68v8uogkr0ft0qtq3xphdzhr0",
    "https://dl.dropboxusercontent.com/scl/fi/inrp4743y26jpo6o2mdkx/plant_precise_373.png?rlkey=gkdpre7lv42eq57quolrqlbes",
    "https://dl.dropboxusercontent.com/scl/fi/ecjhoxexulhxd4amxa2ij/plant_precise_391.png?rlkey=wvg56jmehave4i4lrvt8g27rk",
    "https://dl.dropboxusercontent.com/scl/fi/uh84eo8btp8l3xe151gwa/plant_precise_403.png?rlkey=ia4xvok8288vnu2an9p554n26",
    //青
    // Falling plants
    ];
    const pinkTextures = [
    "https://dl.dropboxusercontent.com/scl/fi/yizqmfomoc0xuag4y32bm/plant_precise_258.png?rlkey=zhrhsbr2gx9m8idfb189ffqco",
    "https://dl.dropboxusercontent.com/scl/fi/qyi72q9i0sg6mpdrfpyp7/plant_precise_260.png?rlkey=nzyc222lc7b9mf4chvapp08uv",
    "https://dl.dropboxusercontent.com/scl/fi/j53zthropm0dtemo19az4/plant_precise_261.png?rlkey=2m7t71tjvze2k7eo5zmo4tdxc",
    "https://dl.dropboxusercontent.com/scl/fi/qk96rs4954mmvsye7e1j6/plant_precise_262.png?rlkey=v7b37b82xu2n65bhtv5w4x2h7",
    "https://dl.dropboxusercontent.com/scl/fi/ua37hsw2t97odcs7lbxcb/plant_precise_263.png?rlkey=xoquijqovku7geavfblkj83ff",
    "https://dl.dropboxusercontent.com/scl/fi/m2n649a21wx8fiuh4lxjl/plant_precise_264.png?rlkey=q6xhndzo10auw8i3cb7mf7jke",
    "https://dl.dropboxusercontent.com/scl/fi/lqol7xy7htboet7ak7pdg/plant_precise_265.png?rlkey=83h4zgr2gzlral7m59oqyujdv",
    "https://dl.dropboxusercontent.com/scl/fi/m7hgvvp5h4wqkihl7ei5j/plant_precise_266.png?rlkey=x1fafwuka16f4vl4wij2p5jy9",
    // ピンク
    // Falling plants
    ];
    const groundTextures = [
    "https://dl.dropboxusercontent.com/scl/fi/5pnr4rzo8w9ielzwxc1se/plant_precise_11.png?rlkey=ih3lrxpt5auq30sdy20um5six",
    "https://dl.dropboxusercontent.com/scl/fi/cjh8oqk0i4vg150v653gu/plant_precise_12.png?rlkey=opv8k1mry2nrn6vwt6nzdbns0",
    "https://dl.dropboxusercontent.com/scl/fi/bl84non5etenxjayxp9rz/plant_precise_15.png?rlkey=ppnnmaxm3c5uwt00n8c9qcf8k",
    ];
    const groundTextures2=[
    "https://dl.dropboxusercontent.com/scl/fi/t32pdiftkw0an9uirw9eh/plant_precise_13.png?rlkey=vgnnljjhubr2a92hidkut5x0f",
    "https://dl.dropboxusercontent.com/scl/fi/xl0lmtynbac3c59eqhq7f/plant_precise_14.png?rlkey=t8nnu9d53205gulwzegil9sp3",
    "https://dl.dropboxusercontent.com/scl/fi/boz2mgryuihopknixfide/plant_precise_16.png?rlkey=izk2qbsi2qrdqat9qk20hqqbv",
    "https://dl.dropboxusercontent.com/scl/fi/m1gl6618wcw1fbgsidqhx/plant_precise_17.png?rlkey=7w5j1vs7bfkbv04lq50oc364c",
    ];
    const groundTextures3=[
    "https://dl.dropboxusercontent.com/scl/fi/irm28o48uzjnqylh9rg8u/plant_precise_18.png?rlkey=v67uox08hp73yawb9uecj3i8e",
    "https://dl.dropboxusercontent.com/scl/fi/bqoqotikbdcgmvaah5bbt/plant_precise_32.png?rlkey=kyc73m4t1sopg5a4ftuywyiku",
    "https://dl.dropboxusercontent.com/scl/fi/bok9d2xbvcxvj3g5zkqfe/plant_precise_33.png?rlkey=0yhl2km0e7szdmukh92mfou8b",

    ];
    const groundTextures4=[
    "https://dl.dropboxusercontent.com/scl/fi/xgsocs6syv0ws8y4ta9aj/plant_precise_28.png?rlkey=joc3t9hs44bamiy74u8918aho",
    "https://dl.dropboxusercontent.com/scl/fi/s0ptb2twg2wy1iwgi9oul/plant_precise_29.png?rlkey=gwk3w1ip3uljxbgrhl0vo67ui",
    "https://dl.dropboxusercontent.com/scl/fi/nr5xo1cg8fzxqdxmkytmv/plant_precise_30.png?rlkey=a5hgt4mt26fmu5omvdqpmcotd",
    "https://dl.dropboxusercontent.com/scl/fi/q8ouojde26fuyrl1w315n/plant_precise_31.png?rlkey=6pnctvehddyvgweqjsn1avr3z",
    ];

    const cubeData = [
    { position: { x: 3, y: 3, z: -40 }, size: { x: 3, y: 3, z: 3 }, label: '欢迎' },
    { position: { x: 3, y: -3, z: -40 }, size: { x: 3, y: 3, z: 3 }, label: 'Bonjour' },
    { position: { x: -3, y: 3, z: -40 }, size: { x: 3, y: 3, z: 3 }, label:  "こんにちは"},
    { position: { x: -3, y: -3, z: -40 }, size: { x: 3, y: 3, z: 3 }, label: 'Wellcome' },
    { position: { x: 0, y: 0, z: -40 }, size: { x: 1, y: 1, z: 1 }, label: 'Yasu521' },
    ];

    const loader = new THREE.TextureLoader();

    let dustPlants = [];//ダスト
    let dustPlants2 = [];//花弁
    let fallingFlowers = [];//上下の花
    let growingFlowers = [];//上の芝
    let growingFlowers2 = [];//下の芝
    let growingFlowers3 = [];//右の芝
    let growingFlowers4 = [];//左の芝
    let sideFlowers = [];//左右の花
    const cubes = []; // キューブの参照を格納する配列
    
    let clickCount = 0; // クリック回数をカウントする変数
    const maxClicks = 5; // 最大クリック回数
    // 時間管理用
    const clock = new THREE.Clock();
    let appear = true; // 徐々に現れるか消えるかのフラグ


    // 立方体を作成
    function createLabeledCube(position, size, labelText) {
        // 立方体のジオメトリとマテリアルを作成
        const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00
        });

        // 立方体メッシュを作成
        const cube = new THREE.Mesh(geometry, material);

        // 位置を指定
        cube.position.set(position.x, position.y, position.z);

        // テクスチャを作成して "welcome" の文字を描画
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');

        // 背景と文字の描画
        context.fillStyle = 'black'; // 背景色
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'white'; // 文字色
        context.font = '48px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(labelText, canvas.width / 2, canvas.height / 2);

        // テクスチャを作成してマテリアルに適用
        const texture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.MeshBasicMaterial({ 
            map: texture,
            transparent: true, // 透明度を有効にする
            opacity: 0.5 // 初期は透明
            });

        // 立方体の表面にテクスチャを適用
        const materials = [
            textMaterial, // 右面
            textMaterial, // 左面
            textMaterial, // 上面
            textMaterial, // 下面
            textMaterial, // 前面にテキスト
            textMaterial  // 背面
        ];
        cube.material = materials;

        setTimeout(() => {
                        scene.remove(cube);
                        dustPlants2 = dustPlants2.filter(f => f !== sprite);
                        }, 20000);

        return cube;
    }
    cubeData.forEach(data => {
        const cube = createLabeledCube(data.position, data.size, data.label);
        scene.add(cube);
        cubes.push(cube); // キューブを配列に保存
    });

    // カメラ移動の初期設定
    // スクロール速度の範囲
    const MAX_SCROLL_SPEED = 3;
    const MIN_SCROLL_SPEED = -3;
    let autoSpeed = 0.7;
    let scrollSpeed = 0 ;
    let currentZ = 0;
    let lastMouseY = 0;
    const topflower = 0 ;
    
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 0;
    let cameraZ = 0; // カメラの初期z位置
    let lastCameraZ = cameraZ; // 前フレームのカメラz位置

    const renderRange = { zMin: -100, zMax: 0 }; // 描画するz位置範囲
    const shiftThreshold = 2; // カメラ移動のしきい値（これを超えると描画範囲をシフト）

    const cameraPositionDisplay = document.getElementById('camera-position');  // カメラ座標表示用の要素

    //画面上の花を生成
    function createtopFlowers(startZ, endZ) {
    for (let x = -5; x <= 75; x += Math.random()*10) { // 横方向の間隔
        for (let z = startZ; z <= endZ; z += 10) 
            { // 奥行き方向の間隔
            loader.load(
                orangeTextures[Math.floor(Math.random() * orangeTextures.length)],
                (texture) => { // テクスチャロード完了時
                    const material = new THREE.SpriteMaterial({ map: texture });
                    const sprite = new THREE.Sprite(material);
  
                    // アーチを形成する位置設定
                    const posX = - 35 + x; // X座標はそのまま
                    const posY = 5 + 10 * Math.sin((x / 70) * Math.PI) + Math.random() * 5; // サイン波でアーチの高さを設定
                    const posZ = z + Math.random() * 50 + 10; // Z座標はそのまま
  
                    sprite.position.set(posX, posY, posZ);
  
                    // ランダムなサイズ
                    const scale = Math.random() * 2 + 0.5;
                    sprite.scale.set(scale, scale, 1);
  
                    // 回転
                    const baseRotation = Math.PI - 5.5; // 180度（ラジアン）
                    const rotationOffset = (Math.random() - 0.5) * Math.PI / 6; // -30度から+30度の範囲
                    sprite.material.rotation = baseRotation + rotationOffset;
                        fallingFlowers.push(sprite);
                        scene.add(sprite);
                }
            );
        }
    }
  }
    //画面下の花を生成
    function creategroundFlowers(startZ, endZ) {
    for (let x = -40; x < 40; x += 10) { // 横方向の間隔
        for (let z = startZ; z < endZ; z += 20) { // z方向の範囲
            
            // ランダムなテクスチャを選択
            const texture = loader.load(whiteTextures[Math.floor(Math.random() * whiteTextures.length)]);
            const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
            const sprite = new THREE.Sprite(material);

            // 花の位置をランダムにオフセット
            sprite.position.set(
                x + Math.random() * 10 - 5, // 中心をずらして自然に見える
                Math.random() * 3 - 15,    // Y位置（地面の高さを基準）
                z + Math.random() * 10 - 5 // Z位置
            );

            // ランダムなスケールでサイズ調整
            const scale = Math.random() * 0.8 + 0.5; // 0.5〜1.3の範囲
            sprite.scale.set(scale, scale, 1);

            // 回転を±30°（±Math.PI / 6）の範囲で設定
            const maxTilt = Math.PI / 6; // 30度
            const minTilt = -Math.PI / 6; // -30度
            sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;

            // 一定確率で追加する
            fallingFlowers.push(sprite); // グローバル配列に追加
            scene.add(sprite);         // シーンに追加            
        }
    }
}

    //画面右の白い花を生成
    function createwhiteFlowers_right(startZ, endZ) {
        for (let x = 5; x < 18; x += 5) { // Spaced horizontally
        for (let z = startZ; z < endZ; z += 40) { // Spaced in depth
            const texture = loader.load(blueTextures[Math.floor(Math.random() * blueTextures.length)]);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
    
            // Position flowers
            const posX = x + Math.random() * 1.5 + 12; // Slight random offset for natural look
            const posY = x + Math.random() * 30 - 25; // Y position increases tilt
            const posZ = z + Math.random() * 1.5;
    
            sprite.position.set(posX, posY, posZ);
    
            // Random size
            const scale = Math.random() * 0.8 + 0.7;
            sprite.scale.set(scale, scale, 1);
    
            // Set initial tilt (rotation in radians)
            // Base the tilt range on the Y position
            const maxTilt = Math.PI / 4 + (posY + 40) / 50; // Larger tilt for higher Y
            const minTilt = Math.PI / 8 + (posY + 40) / 200; // Smaller base tilt
            sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
    
            sideFlowers.push(sprite);
            scene.add(sprite);
        }
        }
    }

    //画面右のピンクの花を生成
    function createpinkFlowers_right(startZ, endZ) {
        for (let x = 20; x < 30 ; x += 5) { // Spaced horizontally
        for (let z = startZ; z < endZ; z += 40) { // Spaced in depth
            const texture = loader.load(pinkTextures[Math.floor(Math.random() * pinkTextures.length)]);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
    
            // Position flowers
            const posX = x + Math.random() *1.5 ; // Slight random offset for natural look
            const posY = x + Math.random() * 30 - 30; // Y position increases tilt
            const posZ = z + Math.random() * 1.5 - 8;
    
            sprite.position.set(posX, posY, posZ);
    
            // Random size
            const scale = Math.random() * 0.8 + 1.0;
            sprite.scale.set(scale, scale, 1);
    
            // Set initial tilt (rotation in radians)
            // Base the tilt range on the Y position
            const maxTilt = Math.PI / 4 + (posY + 40) / 50; // Larger tilt for higher Y
            const minTilt = Math.PI / 8 + (posY + 40) / 200; // Smaller base tilt
            sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
    
            sideFlowers.push(sprite);
            scene.add(sprite);
        }
        }
    }

    //画面左の白い花を生成
    function createwhiteFlowers_left(startZ, endZ) {
        for (let x = - 15; x < -10 ; x += 3) { // Spaced horizontally
        for (let z = startZ; z < endZ; z += 40) { // Spaced in depth
            const texture = loader.load(blueTextures[Math.floor(Math.random() * blueTextures.length)]);
            const material = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(material);
    
            // Position flowers
            const posX = x + Math.random() * 1.5 - 10 ; // Slight random offset for natural look
            const posY = - x + Math.random() * 30 - 30; // Y position increases tilt
            const posZ = z + Math.random() * 1.5;
    
            sprite.position.set(posX, posY, posZ);
    
            // Random size
            const scale = Math.random() * 0.8 + 0.7;
            sprite.scale.set(scale, scale, 1);
    
            // Set initial tilt (rotation in radians)
            // Base the tilt range on the Y position
            const maxTilt = - Math.PI / 4 + (posY + 40) / 50; // Larger tilt for higher Y
            const minTilt = - Math.PI / 8 + (posY + 40) / 200; // Smaller base tilt
            sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
    
            sideFlowers.push(sprite);
            scene.add(sprite);
        }
        }
    }

//画面左のピンクの花を生成
function createpinkFlowers_left(startZ, endZ) {
    for (let x = - 30; x < -20 ; x += 3) { // Spaced horizontally
      for (let z = startZ; z < endZ; z += 40) { // Spaced in depth
        const texture = loader.load(pinkTextures[Math.floor(Math.random() * pinkTextures.length)]);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
  
        // Position flowers
        const posX = x + Math.random() * 1.5 - 4; // Slight random offset for natural look
        const posY = - x + Math.random() * 30 - 30; // Y position increases tilt
        const posZ = z + Math.random() * 1.5 - 8;
  
        sprite.position.set(posX, posY, posZ);
  
        // Random size
        const scale = Math.random() * 0.8 + 1.0;
        sprite.scale.set(scale, scale, 1);
  
        // Set initial tilt (rotation in radians)
        // Base the tilt range on the Y position
        const maxTilt = - Math.PI / 4 + (posY + 40) / 150; // Larger tilt for higher Y
        const minTilt = - Math.PI / 8 + (posY + 40) / 200; // Smaller base tilt
        sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt -10;
  
        sideFlowers.push(sprite);
        scene.add(sprite);
      }
    }
  }

//画面上の芝を生成
function createtopGround(startZ, endZ) {
    for (let x = -12; x < 80; x += Math.random()*5) { // 横方向の間隔
      for (let z = startZ; z < endZ; z += Math.random()*5) { // z方向の範囲
        const texture = loader.load(groundTextures[Math.floor(Math.random() * groundTextures.length)]);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
  
        // 花の位置
        sprite.position.set(
          x + Math.random() * 1.5 - 35, // 自然な見た目のためのランダムなオフセット
          10 + 10 * Math.sin((x / 70) * Math.PI) + Math.random() * 5, // サイン波でアーチの高さを設定
          z + Math.random() * 1.5
        );
  
        // ランダムなサイズ
        const scale = Math.random() * 0.8 + 0.5;
        sprite.scale.set(scale, scale, 1);
        const baseRotation = Math.PI - 5.5; // 180度（ラジアン）
        const rotationOffset = (Math.random() - 0.5) * Math.PI / 6; // -30度から+30度の範囲
        sprite.material.rotation = baseRotation + rotationOffset;
        
        growingFlowers.push(sprite);
        scene.add(sprite);
        
      }
    }
  }

//画面下の芝を生成
function createGround(startZ, endZ) {
  for (let x = -40; x < 40; x += 2) { // 横方向の間隔
    for (let z = startZ; z < endZ; z += 5) { // z方向の範囲
      const texture = loader.load(groundTextures2[Math.floor(Math.random() * groundTextures2.length)]);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);

      // 花の位置
      sprite.position.set(
        x + Math.random() * 1.5 + 5, // 自然な見た目のためのランダムなオフセット
        Math.random() * 5 - 20, // 固定Y位置（地面の高さ）
        z + Math.random() * 1.5
      );

      // ランダムなサイズ
      const scale = Math.random() * 0.8 + 0.5;
      sprite.scale.set(scale, scale, 1);
      if(x<=-6|| x>=-2){
      growingFlowers2.push(sprite);
      scene.add(sprite);
      }
    }
  }
}

//画面右の芝を生成
function createGround_right(startZ, endZ) {
    for (let x = 4; x < 18; x += 2) { // Spaced horizontally
      for (let z = startZ; z < endZ; z += 2) { // Spaced in depth
        const texture = loader.load(groundTextures3[Math.floor(Math.random() * groundTextures3.length)]);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
  
        // Position flowers
        const posX = x + Math.random() * 1.5 + 20; // Slight random offset for natural look
        const posY = x + Math.random() * 30 - 30; // Y position increases tilt
        const posZ = z + Math.random() * 1.5;
  
        sprite.position.set(posX, posY, posZ);
  
        // Random size
        const scale = Math.random() * 0.8 + 0.5;
        sprite.scale.set(scale, scale, 1);
  
        // Set initial tilt (rotation in radians)
        // Base the tilt range on the Y position
        const maxTilt = Math.PI / 4 + (posY + 40) / 100; // Larger tilt for higher Y
        const minTilt = Math.PI / 8 + (posY + 40) / 200; // Smaller base tilt
        sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
  
        growingFlowers3.push(sprite);
        scene.add(sprite);
      }
    }
  }
  //画面左の芝を生成
  function createGround_left(startZ, endZ) {
    for (let x = - 20; x < -5 ; x += 2) { // Spaced horizontally
      for (let z = startZ; z < endZ; z += 2) { // Spaced in depth
        const texture = loader.load(groundTextures4[Math.floor(Math.random() * groundTextures4.length)]);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
  
        // Position flowers
        const posX = x + Math.random() * 1.5 - 20; // Slight random offset for natural look
        const posY = - x + Math.random() * 30 - 30; // Y position increases tilt
        const posZ = z + Math.random() * 1.5;
  
        sprite.position.set(posX, posY, posZ);
  
        // Random size
        const scale = Math.random() * 0.8 + 0.5;
        sprite.scale.set(scale, scale, 1);
  
        // Set initial tilt (rotation in radians)
        // Base the tilt range on the Y position
        const maxTilt = - Math.PI / 4 + (posY + 40) / 100; // Larger tilt for higher Y
        const minTilt = - Math.PI / 8 + (posY + 40) / 200; // Smaller base tilt
        sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt + 25 ;
  
        growingFlowers4.push(sprite);
        scene.add(sprite);
      }
    }
  }

    // 下から上への植物生成
    function dustFlowers(startZ, endZ) {
        for (let x = -20; x < 20; x += 5) { // 横方向の間隔
            for (let z = startZ; z < endZ; z += 5) { // 奥行き方向の間隔
                const texture = loader.load(dustTextures[Math.floor(Math.random() * dustTextures.length)]);
                const material = new THREE.SpriteMaterial({ map: texture });
                const sprite = new THREE.Sprite(material);

                const posX = x + Math.random() * 1.5 + 5; // 自然な見た目のためのランダムなオフセット
                const posY = Math.random() * 50 - 15; // 固定Y位置（地面の高さ）
                const posZ = z + Math.random() * 2 + 10;
        
                sprite.position.set(posX, posY, posZ);
        
                // ランダムなサイズ
                const scale = Math.random() * 0.8 + 0.5;
                sprite.scale.set(scale, scale, 1);
        
                // 初期傾き設定
                const maxTilt =  Math.PI / 4 + (posY + 40) / 50; 
                const minTilt =  Math.PI / 8 + (posY + 40) / 200;
                sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
                if(Math.random()<=0.1)
                    {
        
                    dustPlants.push(sprite);
                    scene.add(sprite);
                    // Remove flowers after a while for dynamic changes
                    setTimeout(() => {
                        scene.remove(sprite);
                        dustPlants = dustPlants.filter(f => f !== sprite);
                        }, Math.random() * 5000 + 8000); // 8-13 seconds lifespan
                }
            }
        }
    }

    // 上から下への植物生成
    function dustFlowers2(startZ, endZ) {
        for (let x = -20; x < 20; x += 5) { // 横方向の間隔
            for (let z = startZ; z < endZ; z += 5) { // 奥行き方向の間隔
                const texture = loader.load(fallingTextures2[Math.floor(Math.random() * fallingTextures2.length)]);
                const material = new THREE.SpriteMaterial({ map: texture });
                const sprite = new THREE.Sprite(material);

                // 初期位置設定
                const posX = x + Math.random() * 1.5 + 5 ;
                const posY = Math.random() * 50 + 0; // 初期のY座標をランダム化
                const posZ = z + Math.random() * 10 - 10;
        
                sprite.position.set(posX, posY, posZ);
        
                // ランダムなサイズ
                const scale = Math.random() * 0.8 + 0.3;
                sprite.scale.set(scale, scale, 1);
        
                // 初期傾き設定
                const maxTilt =  Math.PI / 4 + (posY + 40) / 50; 
                const minTilt =  Math.PI / 8 + (posY + 40) / 200;
                sprite.material.rotation = Math.random() * (maxTilt - minTilt) + minTilt;
                if(Math.random()<=0.3)
                    {
        
                    dustPlants2.push(sprite);
                    scene.add(sprite);
                    // Remove flowers after a while for dynamic changes
                    setTimeout(() => {
                        scene.remove(sprite);
                        dustPlants2 = dustPlants2.filter(f => f !== sprite);
                        }, Math.random() * 4000 + 5000); // 3-7 seconds lifespan
                }
            }
        }
    }
        // 植物を下から上にあげる。
    function dustupFlowers() {
        dustPlants.forEach(sprite => {
            // Y方向に上昇
            if (scrollSpeed >= 0 ){
            sprite.position.y += scrollSpeed*0.1*Math.random() + 0.01; 
            }
        });
    }
    // 植物を上から下に下げる。
    function dustdownFlowers() {
        dustPlants2.forEach(sprite => {
            // Y方向に下降
            if (scrollSpeed >= 0 ){
            sprite.position.y -= scrollSpeed*0.1*Math.random() +0.05; 
            }
        });
    }
    function updownFlowers() {

        growingFlowers.forEach((flower, index) => {
        flower.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01; // ゆっくり上下に揺れる
        });
        growingFlowers2.forEach((flower, index) => {
        flower.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01; // ゆっくり上下に揺れる
        });
        growingFlowers3.forEach((flower, index) => {
        flower.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01; // ゆっくり上下に揺れる
        });
        growingFlowers4.forEach((flower, index) => {
        flower.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01; // ゆっくり上下に揺れる
        });

        fallingFlowers.forEach((flower, index) => {
        flower.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01; // ゆっくり上下に揺れる
        });
    }

    // 共通処理
    function removeObjectsOutOfRange(objectsList, zMin, zMax) {
        for (let i = objectsList.length - 1; i >= 0; i--) {
            const object = objectsList[i];
            if (object.position.z < zMin || object.position.z > zMax) {
                scene.remove(object);
                objectsList.splice(i, 1); // リストから削除
            }
        }
    }

    // 画面外になった画像の削除
    function removeFlowersOutOfRange(zMin, zMax) {
        const objectLists = [growingFlowers, growingFlowers2,growingFlowers3,growingFlowers4,fallingFlowers, sideFlowers];
        objectLists.forEach(list => removeObjectsOutOfRange(list, zMin, zMax));
    }
    

    function update() {
        const cameraZ = camera.position.z; // 現在のカメラ位置
        if (Math.abs(cameraZ - lastCameraZ) > shiftThreshold) {
            // 範囲をシフト
            const shiftAmount = cameraZ - lastCameraZ;
            renderRange.zMin += shiftAmount;
            renderRange.zMax += shiftAmount;
            if(clickCount>=0){clickCount -= 0.1;}
            // 古い範囲の花を削除
            removeFlowersOutOfRange(renderRange.zMin - 1, renderRange.zMax + 1); // マージンを追加
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
            lastCameraZ = cameraZ; // カメラ位置を更新
        }
    }
      // 共通成長処理を関数化
    function growFlowers(flowers, maxScale) {
        flowers.forEach(flower => {
            const growth = Math.random() * 0.1 + 0.6; // 成長量
            if (flower.scale.x < maxScale) {
                flower.scale.set(
                    flower.scale.x + growth,
                    flower.scale.y + growth
                );
            }
        });
    }


            // ウィンドウサイズ変更対応
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Handle pointer movement to adjust camera perspective
    window.addEventListener("mousemove", (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normalize to -1 to 1
        const mouseY = - (event.clientY / window.innerHeight) * 2 + 1; // Normalize to -1 to 1
    
        camera.rotation.y = - mouseX * 0.5; // Rotate horizontally
        camera.rotation.x =  mouseY * 0.2; // Rotate vertically
      
        growFlowers(growingFlowers, 8);
        growFlowers(growingFlowers2, 8);
        growFlowers(growingFlowers3, 8);
        growFlowers(growingFlowers4, 8);
        growFlowers(sideFlowers, 7);
        growFlowers(fallingFlowers, 9);
        });

    // マウスホイール動作を検知してスクロール速度を設定
    window.addEventListener("wheel", (event) => {
        // スクロール速度の調整
        scrollSpeed -= event.deltaY * 0.05;
        scrollSpeed = Math.max(MIN_SCROLL_SPEED, Math.min(MAX_SCROLL_SPEED, scrollSpeed));

        // ランダムに成長処理を実行
        if (Math.random() <= 0.2) {
            growFlowers(growingFlowers, 8);
        }
        // ランダムに成長処理を実行
        if (Math.random() <= 0.2) {
            growFlowers(growingFlowers2, 8);
        }
        // ランダムに成長処理を実行
        if (Math.random() <= 0.2) {
            growFlowers(growingFlowers3, 8);
        }
        // ランダムに成長処理を実行
        if (Math.random() <= 0.2) {
            growFlowers(growingFlowers4, 8);
        }
        // ランダムに成長処理を実行
        if (Math.random() <= 0.2) {
            growFlowers(sideFlowers, 7);
        }
        // ランダムに成長処理を実行
        if (Math.random() <= 0.2) {
            growFlowers(fallingFlowers, 9);
        }
    });

    // クリックイベントを追加
    window.addEventListener('click', () => {
        if (clickCount < maxClicks) {
          clickCount++; // クリック回数を増やす
          growFlowers(growingFlowers, 8);
          growFlowers(growingFlowers2, 8);
          growFlowers(growingFlowers3, 8);
          growFlowers(growingFlowers4, 8);
          growFlowers(sideFlowers, 7);
          growFlowers(fallingFlowers, 9);
        }
    });

    // アニメーション
    // 繰り返し
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
      updownFlowers()

      if(Math.random()<=0.06)createpinkFlowers_right(renderRange.zMin, renderRange.zMax);
      if(Math.random()<=0.06)createpinkFlowers_left(renderRange.zMin, renderRange.zMax);
      if(Math.random()<=0.06)createwhiteFlowers_left(renderRange.zMin, renderRange.zMax);
      if(Math.random()<=0.06)createwhiteFlowers_right(renderRange.zMin, renderRange.zMax);
      if(Math.random()<=0.04)creategroundFlowers(renderRange.zMin, renderRange.zMax);
      if(Math.random()<=0.04)createtopFlowers(renderRange.zMin, renderRange.zMax);
        
      removeFlowersOutOfRange(renderRange.zMin - 1, renderRange.zMax + 1); // マージンを追加
      renderer.render(scene, camera);
    }

    animate();

  </script>
</body>
</html>