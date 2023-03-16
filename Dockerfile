FROM node:16.19.1-alpine3.17 as builder
ARG REACT_APP_API_URL
WORKDIR /app
COPY ./ ./
RUN rm ./packages/vex-web/.env*
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > ./packages/vex-web/.env
RUN yarn && yarn run build:iso-cra

FROM node:16.19.1-alpine3.17
WORKDIR /app
COPY --from=builder /app/packages/vex-web/build ./build
RUN npm install -g serve
ENTRYPOINT ["serve", "-s", "build"]