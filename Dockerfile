# This image uses gitpods full workspace and extends it with openvscode-server to allow browser-based access

FROM gitpod/workspace-full

ENV OPENVSCODE_SERVER_VERSION=1.66.1 \
    OPENVSCODE_SERVER_ROOT=/home/gitpod/.openvscode-server

# Install openvscode-server
# Code adapted from https://github.com/gitpod-io/openvscode-releases/blob/main/Dockerfile
RUN arch=$(uname -m) && \
    if [ "${arch}" = "x86_64" ]; then \
    arch="x64"; \
    elif [ "${arch}" = "aarch64" ]; then \
    arch="arm64"; \
    elif [ "${arch}" = "armv7l" ]; then \
    arch="armhf"; \
    fi && \
    wget https://github.com/gitpod-io/openvscode-server/releases/download/openvscode-server-v${OPENVSCODE_SERVER_VERSION}/openvscode-server-v${OPENVSCODE_SERVER_VERSION}-linux-${arch}.tar.gz -O openvscode-server.tar.gz && \
    tar -xzf openvscode-server.tar.gz && \
    mv openvscode-server-v${OPENVSCODE_SERVER_VERSION}-linux-${arch} ${OPENVSCODE_SERVER_ROOT}


ENV TOOLS=/home/gitpod/.tools/
# Install emscripten
RUN mkdir .tools && \ 
    git clone https://github.com/emscripten-core/emsdk.git ${TOOLS}/emsdk && \ 
    chmod 777 ${TOOLS}/emsdk && \
    cd ${TOOLS}/emsdk && \
    ./emsdk install latest

# activate emscripten and set path
RUN cd .tools/emsdk && ./emsdk activate latest
ENV PATH $PATH:${TOOLS}/emsdk/upstream/emscripten:/tools/emsdk

RUN mkdir workspace

# to persist openvscode-server data in mounted directory uncomment
# ENV HOME=/home/gitpod/workspace

EXPOSE 3000

ENTRYPOINT [ "/bin/sh", "-c", "exec ${OPENVSCODE_SERVER_ROOT}/bin/openvscode-server --host 0.0.0.0 --without-connection-token \"${@}\"", "--" ]

# mount local directories to /home/gitpod/workspace
# e.g. docker run -it --init -p 3000:3000 -v "$(pwd):/home/gitpod/workspace" <image>