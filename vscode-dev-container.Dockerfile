FROM debian:latest

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

# activate emscripten and set path
RUN cd /tools/emsdk && ./emsdk activate latest
ENV PATH $PATH:/tools/emsdk/upstream/emscripten:/tools/emsdk