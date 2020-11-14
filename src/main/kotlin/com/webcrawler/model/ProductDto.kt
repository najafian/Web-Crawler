package com.webcrawler.model

data class ProductDto(
        var productName: String,
        var productPrice: String,
        var productDetail: String,
        var extra: ProductExtraDto? = null,
)
