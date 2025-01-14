// ページが読み込まれた後に実行される
document.addEventListener("DOMContentLoaded", function() {
  // サイト名（ヘッダー）にアニメーション効果を追加
  const siteName = document.querySelector('.header-logo h1');
  siteName.style.opacity = 0; // 初期状態では透明
  siteName.style.transition = "opacity 2s"; // 2秒かけてフェードイン

  // サイト名が画面に表示された時にフェードイン
  setTimeout(() => {
    siteName.style.opacity = 1;
  }, 100);

  // 記事タイトルにアニメーションを追加
  const postTitles = document.querySelectorAll('.post-title');
  postTitles.forEach((title, index) => {
    title.style.opacity = 0; // 初期状態で透明に
    title.style.transition = "opacity 1s ease-in-out";
    title.style.transitionDelay = `${index * 0.5}s`; // 各タイトルが順番にフェードイン

    // タイトルが画面に表示された時にフェードイン
    setTimeout(() => {
      title.style.opacity = 1;
    }, 1000 * index);
  });

  // 記事の概要（excerpts）に対してもアニメーションを追加
  const postExcerpts = document.querySelectorAll('.post-excerpt');
  postExcerpts.forEach((excerpt, index) => {
    excerpt.style.opacity = 0;
    excerpt.style.transition = "opacity 1s ease-in-out";
    excerpt.style.transitionDelay = `${(index + 1) * 0.5}s`; // 概要も少しずつ表示

    setTimeout(() => {
      excerpt.style.opacity = 1;
    }, 1000 * (index + 1));
  });

  // ナビゲーションリンクにホバー時の効果を追加
  const navLinks = document.querySelectorAll('.header-nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      link.style.color = "#f39c12"; // ホバー時に色変更
      link.style.transition = "color 0.3s ease-in-out";
    });
    link.addEventListener('mouseout', () => {
      link.style.color = "#fff"; // 通常時の色に戻す
    });
  });

  // サイドバーのアイテムにホバー時に色を変更するエフェクト
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach(item => {
    item.addEventListener('mouseover', () => {
      item.style.backgroundColor = "#f1c40f"; // ホバー時の背景色
      item.style.transition = "background-color 0.3s ease-in-out";
    });
    item.addEventListener('mouseout', () => {
      item.style.backgroundColor = "#f4f4f4"; // 通常時の背景色
    });
  });

  // 記事の投稿日をクリックしたら、その記事の詳細に移動するように設定
  const postDates = document.querySelectorAll('.post-date');
  postDates.forEach(date => {
    date.style.cursor = 'pointer';
    date.addEventListener('click', function() {
      alert('この記事の詳細ページに移動します！');
      // 実際には、詳細ページに遷移させる処理（例: window.location.href = '詳細ページURL';）を追加する
    });
  });
});