package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := ":8888"
	fmt.Println("initializing SERVER on localhost", port)
	log.Fatal(http.ListenAndServe(port, http.FileServer(http.Dir("site/"))))
}
