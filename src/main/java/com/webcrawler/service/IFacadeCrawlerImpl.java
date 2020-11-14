package com.webcrawler.service;

import com.webcrawler.model.ProductDto;
import com.webcrawler.service.action.CrawlProductAction;
import com.webcrawler.service.crawler.CrawlPageUrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

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

    /**
     * @param url This is an Url parameter for crawling
     * @return If all links and process is corrected then the result should be True
     */
    @Override
    public boolean doCrawlOnLinkAndSave(String url) {
        if (repoProcess.getNumberOfRows() == 0) {
            Collection<CrawlProductAction> crawlProductActions = crawlPageUrl.doCrawlAction(url);
            repoProcess.saveProducts(crawlProductActions);
        }
        return true;
    }

    /**
     * @param page This parameter is Used for making pageable on results
     * @return
     */
    @Override
    public Page<ProductDto> exhibitCrawlingProductResult(Pageable page, boolean pagerAction) {
        return repoProcess.getPageableProductResults(page, pagerAction);
    }
}
