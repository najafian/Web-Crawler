package com.webcrawler.repository

import com.webcrawler.model.ProductModel
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;
interface ProductRepository : PagingAndSortingRepository<ProductModel, Int?>{

        @RestResource
        override fun findAll(page: Pageable): Page<ProductModel>
}
