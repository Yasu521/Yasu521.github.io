# Nginxの公式イメージをベースにする
FROM nginx:1.26.1

# Nginx設定ファイルをコピー
COPY nginx.conf /etc/nginx/nginx.conf

# 404ページをドキュメントルートにコピー
COPY 404.html /usr/share/nginx/html/404.html

# その他のコンテンツもドキュメントルートにコピー
COPY index.html /usr/share/nginx/html/
