package com.webcrawler.service.action;

import com.webcrawler.model.ProductModel;
import com.webcrawler.service.util.JSoupUtil;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.RecursiveAction;
import java.util.stream.Collectors;

import static com.webcrawler.service.util.JSoupUtil.extractHtmlLink;
import static java.util.Collections.synchronizedList;

public class CrawlCategoryLinkAction extends RecursiveAction {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final Set<String> uniqueLiUrl;
    private Collection<CrawlProductLinkAction> crawlProductLinkActions;
    private final String this_url;
    private String main_url;

    public CrawlCategoryLinkAction(String this_url, String main_url, Set<String> uniqueLiUrl) {
        this.uniqueLiUrl = uniqueLiUrl;
        crawlProductLinkActions = synchronizedList(new ArrayList());
        this.this_url = this_url;
        this.main_url = main_url;
    }

    @Override
    protected void compute() {
        crawlProductLinkActions = extractListOfProductLink();
        invokeAll(crawlProductLinkActions);
    }

    private Collection<CrawlProductLinkAction> extractListOfProductLink() {
        Collection<CrawlProductLinkAction> crawlProductLinkActions = synchronizedList(new ArrayList());
        Elements elementFromUrl = JSoupUtil.getElementFromUrl(this_url, "li>.product-item-info>a[href]");
        if (elementFromUrl != null && elementFromUrl.size() > 0) {
            Set<String> liLinkList = extractHtmlLink(elementFromUrl);
            liLinkList.parallelStream().forEach(item -> {
                        String liElement = item.split("#")[0];
                        if (!uniqueLiUrl.contains(liElement)) {
                            crawlProductLinkActions.add(new CrawlProductLinkAction(main_url, liElement));
                            uniqueLiUrl.add(liElement);
                        }else{
                            log.info("This Url is Redundant: "+liElement);
                        }
                    }
            );
        }
        return crawlProductLinkActions;
    }

    public List<ProductModel> getProductList() {
        return crawlProductLinkActions
                .stream()
                .map(CrawlProductLinkAction::getProductModel)
                .collect(Collectors.toList());
    }
}
