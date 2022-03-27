OUTFOLDER 	= site/out
SOURCEFOLDER = wasm
SERVERFOLDER = server

all: build serve

init:
	mkdir $(OUTFOLDER)   

build:
	GOOS=js GOARCH=wasm go build -o $(OUTFOLDER)/main.wasm ./$(SOURCEFOLDER)

serve:
	go run ./$(SERVERFOLDER)/main.go


