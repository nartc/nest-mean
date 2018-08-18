FROM node:10-alpine as build

COPY . /src
WORKDIR /src

RUN yarn && \
    yarn cache clean

FROM node:10-alpine
COPY --from=build /src/tsconfig.json /opt/app/tsconfig.json
COPY --from=build /src/tslint.json /opt/app/tslint.json
COPY --from=build /src/config /opt/app/config
COPY --from=build /src/dist /opt/app
COPY --from=build /src/node_modules /opt/app/node_modules
WORKDIR /opt/app

ENV NODE_ENV=development
RUN npm install pm2 -g

ENTRYPOINT ["pm2-runtime", "main.js"]
