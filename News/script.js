let currentIndex = 0;
const itemsPerPage = calculateItemsPerPage();
const container = document.querySelector('.container');
const isMobile = window.innerWidth <= 768;

displayArticles();

function calculateItemsPerPage() {
    const width = window.innerWidth;
    if (width > 1200) return 4;
    if (width > 768) return 2;
    return 3;
}

function displayArticles() {
    const container = document.getElementById('articles-container');
    const pagination = document.getElementById('pagination');
    const itemsPerPage = calculateItemsPerPage();
    const totalPages = Math.ceil(articlesData.length / itemsPerPage);
    const currentPage = Math.floor(currentIndex / itemsPerPage) + 1;

    container.innerHTML = "";
    pagination.innerHTML = "";

    const currentItems = articlesData.slice(currentIndex, currentIndex + itemsPerPage);
    currentItems.forEach(doc => {
        const div = document.createElement('div');
        div.classList.add('news-item');

        div.innerHTML = `
            <img src="${doc.image}" alt="${doc.title}" class="news-image">
            <h3 class="news-title">${doc.title}</h3>
            
            <p class="news-description">${doc.description}<button class="news-readmore">+</button></p>
            
            
        `;

        container.appendChild(div);
        
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            container.style.flexDirection = 'column';
            div.querySelector('.news-readmore').addEventListener('click', () => {
                loadFullArticle(doc.content, doc.js, doc.cssfile, div, isMobile);
            });
            div.querySelector('.news-image').addEventListener('click', () => {
                loadFullArticle(doc.content, doc.js, doc.cssfile, div, isMobile);
            });
        } else {
            container.style.flexDirection = 'row';
            div.querySelector('.news-readmore').addEventListener('click', () => {
                loadFullArticle(doc.content2, doc.js2, doc.cssfile2, div, isMobile);
            });
            div.querySelector('.news-image').addEventListener('click', () => {
                loadFullArticle(doc.content2, doc.js2, doc.cssfile2, div, isMobile);
            });
        }
    });
    if( currentPage != 1) pagination.innerHTML += `<button onclick="prevPage()">❮</button>`;
    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<span class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</span>`;
    }
    pagination.innerHTML += `<button onclick="nextPage()">❯</button>`;
}

function nextPage() {
    currentIndex += calculateItemsPerPage();
    if (currentIndex >= articlesData.length) currentIndex = 0;
    displayArticles();
}

function prevPage() {
    currentIndex -= calculateItemsPerPage();
    if (currentIndex < 0) currentIndex = articlesData.length - (articlesData.length % calculateItemsPerPage());
    displayArticles();
}

function goToPage(page) {
    currentIndex = (page - 1) * calculateItemsPerPage();
    displayArticles();
}
function loadFullArticle(contentUrl, jsFile, cssfile ,parentElement, isMobile) {
  
  if (isMobile) {
    const originalContent = parentElement.innerHTML;

    const fullArticleContainer = document.createElement('div');
    fullArticleContainer.classList.add('full-article');

    const iframe = document.createElement('iframe');
    iframe.src = contentUrl;
    iframe.style.border = 'none';
    iframe.style.width = '100vh';
    iframe.style.height = '400px';

    fullArticleContainer.appendChild(iframe);
    parentElement.innerHTML = ''; 
    parentElement.appendChild(fullArticleContainer);

    if (typeof jsFile !== 'undefined' && jsFile !== null) {
        const existingScripts = document.querySelectorAll('script');
        existingScripts.forEach(script => {
            if (script.src) {
                script.remove();
            }
        });

        const script = document.createElement('script');
        script.src = jsFile;
        script.onload = function() {
            console.log(`JSファイルの読み込み完了: ${jsFile}`);
        };
        document.body.appendChild(script);
    }
    if (typeof cssfile !== 'undefined' && cssfile !== null) {

        const existingStyles = document.querySelectorAll('link[rel="stylesheet"]');
        existingStyles.forEach(style => {
            if (style.href && style.href.includes('styles.css')) {
                style.remove();
            }
        });

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssfile;
        link.onload = function() {
            console.log(`CSSファイルの読み込み完了: ${cssfile}`);
        };
        document.head.appendChild(link);
    }
    return;
  }else{
    const mainContainer = document.querySelector('main.main-container');
    if (!mainContainer) {
        console.error('404');
        return;
      }
    
    const fullArticleContainer = document.createElement('div');
    fullArticleContainer.classList.add('full-article');
    fullArticleContainer.style.width = '100%';
    fullArticleContainer.style.margin = '0 auto';
    fullArticleContainer.style.padding = '20px'; 
    fullArticleContainer.style.boxSizing = 'border-box';
    fullArticleContainer.style.backgroundColor = '#fff';
    fullArticleContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    const iframe = document.createElement('iframe');
    iframe.src = contentUrl;
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = 'auto'; 
    iframe.style.display = 'block';

    iframe.onload = () => {
        try {
        const iframeDocument = iframe.contentWindow.document;
        const contentHeight = iframeDocument.body.scrollHeight;
        iframe.style.height = `${contentHeight}px`;
        } catch (error) {
        console.warn('iframeの高さを動的に設定できませんでした:', error);
        }
    };

    fullArticleContainer.appendChild(iframe);

    const style = document.createElement('style');
    style.innerHTML = `
        .full-article iframe {
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        }
    `;
    fullArticleContainer.appendChild(style);

    mainContainer.insertAdjacentElement('afterend', fullArticleContainer);
    if (typeof jsFile !== 'undefined' && jsFile !== null) {
        const existingScripts = document.querySelectorAll('script');
        existingScripts.forEach(script => {
            if (script.src) {
                script.remove();
            }
        });

        const script = document.createElement('script');
        script.src = jsFile;
        script.onload = function() {
            console.log(`JSファイルの読み込み完了: ${jsFile}`);
        };
        document.body.appendChild(script);
    }
    if (typeof cssfile !== 'undefined' && cssfile !== null) {

        const existingStyles = document.querySelectorAll('link[rel="stylesheet"]');
        existingStyles.forEach(style => {
            if (style.href && style.href.includes('styles.css')) {
                style.remove();
            }
        });
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssfile;
        link.onload = function() {
            console.log(`CSSファイルの読み込み完了: ${cssfile}`);
        };
        document.head.appendChild(link);
    }
    return;
  }
}

window.addEventListener('resize', () => {
  itemsPerPage = calculateItemsPerPage();
  displayArticles();
});
window.addEventListener('DOMContentLoaded', () => {
  const dateElement = document.getElementById('current-date');

  const defaultDate = "Sunday, May 21, 2000"; 
  const useCurrentDate = true;

  if (useCurrentDate) {
      const today = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateElement.textContent = today.toLocaleDateString('en-US', options);
  } else {
      dateElement.textContent = defaultDate;
  }
});