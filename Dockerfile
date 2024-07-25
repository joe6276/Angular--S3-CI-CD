
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build 


FROM nginx:alpine

COPY --from=builder /app/dist/blogsapp/browser /usr/share/nginx/html 

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD  ["nginx", "-g", "daemon off;"]

#docker build -t ndambuki/blogsfrontend . 

# docker run -p 80:80 --name frontend  ndambuki/blogsfrontend
