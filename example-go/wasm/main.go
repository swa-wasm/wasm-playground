package main

import (
	"fmt"
	"syscall/js"
)

func main() {
	fmt.Println("hello Go in WebAssembly")
	document := js.Global().Get("document")
	p := document.Call("createElement", "p")
	p.Set("innerHTML", "hello Go in WASM")
	p.Set("className", "block")

	styles := document.Call("createElement", "style")
	styles.Set("innerHTML", `
		.block {
			border: 1px solid black; color: white; background: black;
		}
	`)

	document.Get("head").Call("appendChild", styles)
	document.Get("body").Call("appendChild", p)

}
