# 1단계: 빌드
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: nginx 서버로 정적 파일 서빙
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
