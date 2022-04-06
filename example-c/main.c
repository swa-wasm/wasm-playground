#include <stdio.h>
#include <stdlib.h>
#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE int fib(int n)
{
    if (n < 2)
        return 1;
    return fib(n - 1) + fib(n - 2);
}

EMSCRIPTEN_KEEPALIVE int fibI(int n)
{
    if (n == 0)
        return 1;
    int fibs[n + 1];
    fibs[0] = 1;
    fibs[1] = 1;
    for (int i = 2; i <= n; i++)
    {
        fibs[i] = fibs[i - 1] + fibs[i - 2];
    }
    return fibs[n];
}
