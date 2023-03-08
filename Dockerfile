FROM keymetrics/pm2:18-alpine

RUN mkdir -p /var/app

WORKDIR /var/app

COPY . .
RUN yarn install && yarn build && yarn cache clean


ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]