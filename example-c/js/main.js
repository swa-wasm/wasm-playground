let bubbleSort;
let fib;
let fibI;

document.addEventListener("DOMContentLoaded", () => {
  fib = Module.cwrap("fib", "number", ["number"]);
  fibI = Module.cwrap("fibI", "number", ["number"]);
  bubbleSort = Module.cwrap("bubbleSort", "number", ["number", "number"]);

  console.log("READY");
  document.querySelector("#call-wasm-fib").addEventListener("click", () => {
    const n = Number(document.querySelector("#fib-n").value);
    alert(fib(n));
  });
  document.querySelector("#call-wasm-fibI").addEventListener("click", () => {
    const n = Number(document.querySelector("#fibI-n").value);
    alert(fibI(n));
  });

  document.querySelector("#benchmark-fibonacci").addEventListener("click", () => {
    const limit = 40;
    console.log("Run recursive fibonacci benchmark");
    wasmJsBenchmark(limit, fib, jsFib);
    console.log("Run iterative fibonacci benchmark");
    wasmJsBenchmark(40 * limit, fibI, jsFibI);
  });

  document.querySelector("#benchmark-bubblesort").addEventListener("click", () => {
    const iterations = 5;
    const arraySize = 10000;
    console.log("Run bubblesort benchmark");
    const jsTimes = [];
    const wasmTimes = [];
    for (let i = 0; i < iterations; i++) {
      wasmTimes.push(benchmarkSingleRun(wasmBubbleSort, buildDataArray(arraySize)));
      jsTimes.push(benchmarkSingleRun(jsBubbleSort, buildDataArray(arraySize)));
    }
    const speedup = jsTimes.map((value, index) => value / wasmTimes[index]);
    console.log("WASM timing [ms]: " + wasmTimes);
    console.log("JS timing [ms]: " + jsTimes);
    console.log("Speedup WASM: " + speedup);
  });
});

function buildDataArray(arraySize) {
  const data = [];
  for (let i = 0; i < arraySize; i++) {
    data.push(Math.ceil(Math.random() * 1000));
  }
  return data;
}

function jsFib(n) {
  if (n < 2) return 1;
  return jsFib(n - 1) + jsFib(n - 2);
}

function jsFibI(n) {
  if (n == 0) return 1;
  const fibs = [];
  fibs[0] = 1;
  fibs[1] = 1;
  for (let i = 2; i <= n; i++) {
    fibs[i] = fibs[i - 1] + fibs[i - 2];
  }
  return fibs[n];
}

function wasmBubbleSort(data) {
  //Needs to handle memory allocation for wasm
  const length = data.length;
  const pointer = Module._malloc(length * Module.HEAP32.BYTES_PER_ELEMENT);

  const typedData = new Int32Array(data);
  Module.HEAP32.set(typedData, pointer >> 2);

  const resultPointer = bubbleSort(pointer, length);

  const sortedArray = [];

  for (let i = 0; i < length; i++) {
    sortedArray.push(Module.HEAP32[resultPointer / Module.HEAP32.BYTES_PER_ELEMENT + i]);
  }

  Module._free(pointer);

  return sortedArray;
}

function jsBubbleSort(data) {
  let swapped = false;
  do {
    swapped = false;
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i] <= data[i + 1]) continue;
      const tmp = data[i];
      data[i] = data[i + 1];
      data[i + 1] = tmp;
      swapped = true;
    }
  } while (swapped);
  return data;
}

function wasmJsBenchmark(limit, wasmFun, jsFun) {
  const wasmTimes = [];
  const jsTimes = [];
  for (let i = 0; i < 5; i++) {
    wasmTimes.push(benchmarkRun(limit, wasmFun));
    jsTimes.push(benchmarkRun(limit, jsFun));
  }

  const speedup = jsTimes.map((value, index) => value / wasmTimes[index]);
  console.log("WASM timing [ms]: " + wasmTimes);
  console.log("JS timing [ms]: " + jsTimes);
  console.log("Speedup WASM: " + speedup);
}

function benchmarkRun(limit, fun) {
  const startTime = performance.now();
  for (let i = 0; i < limit; i++) {
    fun(i);
  }
  const endTime = performance.now();
  return endTime - startTime;
}

function benchmarkSingleRun(fun, param) {
  const startTime = performance.now();
  fun(param);
  const endTime = performance.now();
  return endTime - startTime;
}
