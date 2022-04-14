# This image uses openvscode-server and extends it with necessary build tools

FROM gitpod/openvscode-server:latest

USER root

# Update and install general tools
RUN apt update -y && apt upgrade -y && apt install -y python3 git cmake build-essential make

# Install emscripten
RUN mkdir /tools && \ 
    git clone https://github.com/emscripten-core/emsdk.git /tools/emsdk && \ 
    chmod 777 /tools/emsdk && \
    cd /tools/emsdk && \
    ./emsdk install latest

# Install go build-tools
RUN apt install -y golang

USER openvscode-server

# activate emscripten and set path
RUN cd /tools/emsdk && ./emsdk activate latest
ENV PATH $PATH:/tools/emsdk/upstream/emscripten:/tools/emsdk

# Image could contain git-repo so that the user does not have to clone it locally
# BUT: git-credentials are needed to build the image -> could be done in a cloud environment based on logged in user
#   Image build could probably even be done in a GitHub Action
# RUN cd /home/workspace && git clone git@github.com:swa-wasm/wasm-playground.git 

# Run this container using: 
# docker build -t dev-container . && docker run -it --init -p 3000:3000 -v "$(pwd):/home/workspace:cached" dev-container