FROM node:20-alpine

WORKDIR /app

# Сначала копируем манифест зависимостей
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая devDependencies для nodemon)
# Для продакшена можно использовать флаг --only=production, но для dev нам нужен nodemon
RUN npm ci

# Копируем остальной код
COPY . .

EXPOSE 3000

# Команда запуска будет переопределена в docker-compose.yml, 
# но оставим дефолтную на всякий случай
CMD ["node", "src/server.js"]
