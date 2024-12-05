FROM node:18.20.3-alpine3.20 As dev-gw
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./src .
COPY nest-cli.json .
COPY tsconfig*.json ./
RUN npm run build

FROM node:18.20.3-alpine3.20 As prod-gw
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=dev-gw /usr/src/app/package*.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=dev-gw /usr/src/app/dist ./dist
CMD ["node", "dist/main"]