OUTFOLDER 	= site/out


init:
	go get -u github.com/shurcool/goexec   

build:
	GOOS=js GOARCH=wasm go build -o $(OUTFOLDER)/main.wasm .

serve:
	goexec 'http.ListenAndServe(":8080", http.FileServer(http.Dir("site/")))'

run:
	go run .

