FROM node:18-alpine

WORKDIR /app/frontend

COPY . .

RUN yarn install
RUN yarn run build

CMD ["yarn", "run", "dev", "--host", "0.0.0.0"]
