#include "product.h"
#include <stdio.h>

int main()
{
    Product p1(1, 15.99);

    printf("Product number: %d, Price: %f\n", p1.getProductNumber(), p1.getPrice());
    return 0;
}