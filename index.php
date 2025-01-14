<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ciao | Yasuhiro：康洋</title>
  <link rel="alternate" hreflang="en" href="https://yasuhiroiwai.jp/" />
  <link rel="alternate" hreflang="fr" href="https://yasuhiroiwai.jp/" />
  <link rel="alternate" hreflang="ja" href="https://yasuhiroiwai.jp/" />
  <link rel="alternate" hreflang="zh" href="https://yasuhiroiwai.jp/" />
  <link rel="alternate" hreflang="x-default" href="https://yasuhiroiwai.jp/"/>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y2FVBDQYBP"></script>
  <?php
  function add_meta_to_head() {
      echo '<meta name="thumbnail" content="' . wp_get_attachment_url(get_post_thumbnail_id()) . '" />';
  }
  add_meta_to_head();
  ?>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-Y2FVBDQYBP');
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="https://yasu521.github.io/shortcut.ico" type="image/x-icon">
  <link rel="apple-touch-icon" href="https://yasu521.github.io/Ciao.webp">
  <link rel="icon" href="./shortcut.ico" type="image/x-icon">
  
  <meta id="meta-description" name="description" content="A portfolio highlighting contributions to society through activities that promote health and happiness.">
  <meta name="keywords" content="YasuhiroIwai, 康洋, Yasuhiro, Yasu, Ciao, Portfolio, DS, Data Science, AI, Consulting, Career, Projects, Japan, Technology">
  <meta name="robots" content="index, follow">
  <meta name="thumbnail" content="https://yasu521.github.io/Ciao.webp" />

  <meta id="og-title" property="og:title" content="Ciao | Yasuhiro：康洋">
  <meta id="og-description" property="og:description" content="A portfolio highlighting contributions to society through activities that promote health and happiness.">
  <meta id="og-language" property="og:locale" content="en">
  <meta property="og:image" content="https://yasu521.github.io/Ciao.webp">
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="600">
  <meta property="og:url" content="https://yasuhiroiwai.jp/">
  <meta property="og:type" content="website">

  <meta name="twitter:card" content="summary_large_image">
  <meta id="twitter-title" name="twitter:title" content="Ciao | Yasuhiro：康洋">
  <meta id="twitter-description" name="twitter:description" content="A portfolio highlighting contributions to society through activities that promote health and happiness.">
  <meta name="twitter:image" content="https://yasu521.github.io/Ciao.webp">
  <meta name="twitter:url" content="https://yasuhiroiwai.jp/">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ciao | Yasuhiro：康洋",
    "url": "https://yasuhiroiwai.jp/",
    "description": "Yasuhro IWAI：岩井 康洋 | A portfolio highlighting contributions to society through activities that promote health and happiness. Discover growth, diversity, and fostering environments for well-being.",
    "alternateName": "Ciao | Yasuhiro portfolio",
    "inLanguage": "en",
    "thumbnailUrl": "https://yasu521.github.io/Ciao.webp",
    "image": {
      "@type": "ImageObject",
      "url": "https://yasu521.github.io/Ciao.webp",
      "width": 300,
      "height": 300
    }
  }
  </script>
  <script>
        document.addEventListener('DOMContentLoaded', () => {
            const userLang = navigator.language || navigator.userLanguage;
            const langCode = userLang.substring(0, 2);
            const descriptions = {
                en: "Hello, I'm Yasuhiro. Since middle school, I have been contributing to society through activities that promote health and happiness. I value growth with people from diverse backgrounds, fostering environments where health and happiness thrive.",
                fr: "Bonjour, je suis Yasuhiro. Depuis le collège, je contribue à la société par des activités favorisant la santé et le bonheur. Je valorise la croissance avec des personnes aux horizons divers et des environnements propices à la santé et au bonheur.",
                ja: "康洋と申します。私は名前のとおり、中学1年生の頃から健康や幸せにつながる活動を通じて、社会に貢献してまいりました。様々なバックグラウンドを持つ人と共に成長し、健康や幸せを感じられる環境を大切にしています。"
            };
            const titles = {
                en: "Welcome to Yasuhiro's Portfolio",
                fr: "Bienvenue sur le portfolio de Yasuhiro",
                ja: "康洋のポートフォリオへようこそ"
            };
            const locales = {
                en: "en",
                fr: "fr",
                ja: "ja"
            };
            const defaultLang = descriptions[langCode] ? langCode : 'en';

            document.getElementById('meta-description').setAttribute('content', descriptions[defaultLang]);
            document.getElementById('og-title').setAttribute('content', titles[defaultLang]);
            document.getElementById('og-description').setAttribute('content', descriptions[defaultLang]);
            document.getElementById('og-language').setAttribute('content', locales[defaultLang]);
            document.getElementById('twitter-title').setAttribute('content', titles[defaultLang]);
            document.getElementById('twitter-description').setAttribute('content', descriptions[defaultLang]);
            const structuredData = document.querySelector('script[type="application/ld+json"]');
            const jsonData = JSON.parse(structuredData.textContent);
            jsonData.inLanguage = defaultLang;
            jsonData.description = descriptions[defaultLang];
            structuredData.textContent = JSON.stringify(jsonData, null, 2);
        });
  </script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const imagesToPreload = [
        './flag/language.webp','./sns/Figma.webp',
        './sns/Instagram.webp','./sns/Kaggle.webp',
        './sns/LinkedIn.webp','./sns/github.webp',

        './project/1.webp','./project/2.webp',
        './project/3.webp','./project/4.webp',
        './project/4.webp','./project/4.webp',
        './project/5.webp','./project/6.webp',
        './project/7.webp','./project/8.webp'
      ];
      imagesToPreload.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });});
  </script>
</head>
<body>
    <div id="loading-screen">
        <div id="progress-bar-container">
            <div id="progress-bar"></div>
        </div>
        <p id="loading-text">Loading<span id="loading-dots">...</span></p>
        <p id="remaining-time"></p>
    </div>
    <div id="main-content">
        <canvas id="three-canvas"></canvas>
    </div>
    <div id="buttonContainer"></div>
    <div id="contentContainer"></div>
    <div class="blur-overlay"></div>
    <div class="yasu521">YASUHIRO</div>
    <div class="language-menu">
        <button class="language-toggle"id="current-language-icon"aria-label="Language"></button>
        <div class="language-list">
            <button class="language-option" data-lang="en">English</button>
            <button class="language-option" data-lang="fr">Français</button>
            <button class="language-option" data-lang="ja">日本語</button>
            <button class="language-option" data-lang="zh">中文</button>
        </div>
  </div>
<script>
        const timestamp = Date.now();
        const threeScript = document.createElement('script');
        threeScript.src = `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js?v=${timestamp}`;
        threeScript.onload = () => {
            const appScript = document.createElement('script');
            appScript.src = `./script.js?v=${timestamp}`;
            document.head.appendChild(appScript);
        };
        document.head.appendChild(threeScript);
</script>
</body>
</html>
