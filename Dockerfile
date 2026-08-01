FROM nginx:alpine

# Copia a configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos
COPY index.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY script.js /usr/share/nginx/html/script.js

# Copia a pasta do certificado
COPY certificado/ /usr/share/nginx/html/certificado/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
