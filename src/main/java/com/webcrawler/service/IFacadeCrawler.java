package com.webcrawler.service;

import com.webcrawler.model.ProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IFacadeCrawler {
    boolean doCrawlOnLinkAndSave(String url) throws Exception;
    Page<ProductDto> exhibitCrawlingProductResult(Pageable page);
}
