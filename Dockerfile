FROM node:16.14.2

ENV AWS_ACCESS_KEY_ID XXID
ENV AWS_SECRET_ACCESS_KEY XXSECRET
ENV AWS_SESSION_TOKEN XXTOKEN
ENV googleAPIKey YYKEY1
ENV ForkSpoonAPIKey YYKEY2
ENV EdamamKey YYKEY3

COPY ./server /app/server

COPY ./client /app/client

WORKDIR /app/client

RUN npm install

RUN npm run build

WORKDIR /app/server

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]

