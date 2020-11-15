package com.webcrawler.service.crawler;

import com.webcrawler.model.ProductModel;
import com.webcrawler.service.action.CrawlMainLinkAction;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ForkJoinPool;

@Service
public class CrawlPageUrl {
    /**
     * Main method for Crawling the url to get products
     *
     * @param url
     * @return
     */
    public List<ProductModel> doCrawlAction(String url) {
        CrawlMainLinkAction linkAction = new CrawlMainLinkAction(url);
        ForkJoinPool.commonPool().invoke(linkAction);
        Optional<List<ProductModel>> productList = linkAction.getProductList();
        return productList.orElseGet(ArrayList::new);
    }
}
