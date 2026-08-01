FROM nginx:alpine

# Copia os arquivos estáticos direto para o nginx (sem build step)
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
