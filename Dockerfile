
FROM nginx:latest

RUN rm /etc/nginx/nginx.conf

COPY nginx/nginx.conf /etc/nginx

COPY build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]