all: native wasm

# build for native
native:
	gcc main.c -o out/main.out

# build as webassembly for web
wasm:
	emcc main.c -o out/wasm/index.html 

clean:
	rm -rf out && mkdir out && mkdir out/wasm