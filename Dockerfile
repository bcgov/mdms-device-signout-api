FROM node:10.14-alpine

ARG NODE_MAJOR_VERSION=10
ARG NODE_VERSION=10.14.x
ARG APP_VERSION="0.1.0"

ENV INSTALL_PATH /opt/app
ENV SUMMARY="MDMS Device Provisioning API ${APP_VERSION}"  \
  DESCRIPTION="MDMS Device Provisioning API {APP_VERSION} running node nodejs ${NODE_VERSION} on Alpine Linux"
ENV LC_ALL=en_US.UTF-8 \
  LANG=en_US.UTF-8 

LABEL summary="$SUMMARY" \
  description="$DESCRIPTION"

RUN apk update && \
  apk upgrade && \
  apk add --no-cache bash

RUN npm i npm@latest -g --silent

# Create a home for the application
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

# Install app dependencies
COPY .babelrc $INSTALL_PATH
COPY package.json $INSTALL_PATH
COPY package-lock.json $INSTALL_PATH
COPY src $INSTALL_PATH/src

RUN npm i --silent

ENV NODE_PATH $INSTALL_PATH/src

EXPOSE 8089 9229

CMD ["npm", "run", "dev"]

