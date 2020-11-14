package com.webcrawler.service;

import com.webcrawler.model.ProductDto;
import com.webcrawler.service.action.CrawlProductAction;
import com.webcrawler.service.crawler.CrawlPageUrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

import java.util.Collection;

@Service
public class IFacadeCrawlerImpl implements IFacadeCrawler {
    private final CrawlPageUrl crawlPageUrl;
    private final RepositoryProcess repoProcess;

    @Autowired
    public IFacadeCrawlerImpl(CrawlPageUrl crawlPageUrl, RepositoryProcess repoProcess) {
        this.crawlPageUrl = crawlPageUrl;
        this.repoProcess = repoProcess;
    }

    @Override
    public boolean doCrawlOnLinkAndSave(String url) {
        Collection<CrawlProductAction> crawlProductActions = crawlPageUrl.doCrawlAction(url);
        return repoProcess.saveProducts(crawlProductActions);
    }

    @Override
    public Page<ProductDto> exhibitCrawlingProductResult(Pageable page) {
        return repoProcess.getPageableProductResults(page);
    }
}
