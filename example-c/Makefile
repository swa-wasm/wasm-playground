all: wasm

# build as webassembly for web
wasm:
	cp html/custom-template.html out/wasm/index.html
	emcc main.c -o out/wasm/index.js -O3 -s NO_EXIT_RUNTIME=1 -s EXPORTED_RUNTIME_METHODS=ccall,cwrap

clean:
	rm -rf out && mkdir out && mkdir out/wasm