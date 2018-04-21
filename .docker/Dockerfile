FROM node:9.2
MAINTAINER Jason Shin <visualbbasic@gmail.com>

ENV CORE /home/node/app
RUN mkdir $CORE
RUN echo $CORE
WORKDIR $CORE

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

# Install baseline cache
COPY ./package.json ./yarn.lock /tmp/
RUN cd /tmp && yarn
RUN cp -a /tmp/node_modules $CORE

WORKDIR $CORE

CMD ["yarn", "start"]
