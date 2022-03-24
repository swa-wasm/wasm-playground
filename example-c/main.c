#include <stdio.h>
#include <stdlib.h>

int fib(int n)
{
    if (n < 2)
        return 1;
    return fib(n - 1) + fib(n - 2);
}

int fibI(int n)
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

int main()
{
    int array[5] = {0, 1, 2, 3, 4};
    for (int i = 0; i < 5; i++)
    {
        printf("Element[%d] = %d\n", i, array[i]);
    }

    int *dynamic = malloc(1024);
    printf("malloc allocated\n");
    int n = 10;
    for (int i = 0; i < n; i++)
    {
        *(dynamic + i) = fib(i);
        printf("fib(%d) = %d\n", i, *(dynamic + i));
    }

    printf("fibI(%d) = %d\n", 45, fibI(45));

    free(dynamic);
    return 0;
}