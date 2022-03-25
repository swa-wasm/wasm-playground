#include "product.h"

Product::Product(int productNumber, double price)
{
    this->productNumber = productNumber;
    this->price = price;
}

int Product::getProductNumber()
{
    return this->productNumber;
}

double Product::getPrice()
{
    return this->price;
}