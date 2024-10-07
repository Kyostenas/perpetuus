FROM nginx:latest
COPY ./perpetuus-gui/dist/perpetuus-gui/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
