OUTFOLDER 	= out
OBJTARGETS	= main.o product.o
OBJS		= $(OUTFOLDER)/main.o $(OUTFOLDER)/product.o
SOURCE		= main.cpp product.cpp
HEADER		= product.h
OUT			= $(OUTFOLDER)/main.out
CC	 		= g++
FLAGS	 	= -g -c -Wall

all: native wasm


native: $(OBJTARGETS)
	$(CC) -g $(OBJS) -o $(OUT)

main.o: main.cpp
	$(CC) $(FLAGS) main.cpp -o $(OUTFOLDER)/main.o

product.o: product.cpp
	$(CC) $(FLAGS) product.cpp -o $(OUTFOLDER)/product.o

wasm:
	emcc $(SOURCE) -o $(OUTFOLDER)/wasm/index.html 

clean:
	rm -rf out && mkdir out && mkdir out/wasm