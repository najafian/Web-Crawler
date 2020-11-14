package com.webcrawler.service.crawler;

import com.webcrawler.service.action.CrawlProductAction;
import com.webcrawler.service.util.JSoupUtil;
import com.webcrawler.service.util.PageFetchException;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ForkJoinTask;

@Service
public class CrawlPageUrl {
    private static final String LINK_ELEMENT_SELECTOR = "a[href]";
    private static final String ABSOLUTE_HREF_ATTRIBUTE = "abs:href";
    private String mainUrl;

    public Collection<CrawlProductAction> doCrawlAction(String url) {
        Collection<CrawlProductAction> crawlProductActions = new ArrayList();
        mainUrl = url;
        Instant startTime = Instant.now();

        Elements linkElements = JSoupUtil.getElementFromUrl(url, LINK_ELEMENT_SELECTOR);
        if (linkElements != null && linkElements.size() > 0) {
            Set<String> urls = extractValidInternalLinks(linkElements);
            for (String link : urls) {
                crawlProductActions.addAll(extractListOfProductLink(link));
            }
            ForkJoinTask.invokeAll(crawlProductActions);
        }
        return crawlProductActions;
    }

    private Set<String> extractValidInternalLinks(Elements elements) {
        return extractHtmlLink(elements);

    }

    private Set<String> extractHtmlLink(Elements elements) {
        Set uniqueURL = Collections.synchronizedSet(new HashSet<String>());
        if (elements != null)
            elements
                    .stream()
                    .map(link -> link.attr(ABSOLUTE_HREF_ATTRIBUTE))
                    .forEachOrdered(this_url -> {
                        if (this_url.contains(".html")) {
                            uniqueURL.add(this_url);
                        }
                    });
        return uniqueURL;
    }

    private Collection<CrawlProductAction> extractListOfProductLink(String this_url) {
        Collection<CrawlProductAction> crawlProductActions = Collections.synchronizedList(new ArrayList());
        Elements elementFromUrl = JSoupUtil.getElementFromUrl(this_url, "li>.product-item-info>a[href]");
        if (elementFromUrl != null && elementFromUrl.size() > 0) {
            Set<String> liLinkList = extractHtmlLink(elementFromUrl);
            fillActionArray(liLinkList, crawlProductActions);
        }
        return crawlProductActions;

    }

    private void fillActionArray(Set<String> liLinkList, Collection<CrawlProductAction> crawlProductActions) {
        liLinkList.parallelStream().forEach(li -> {
            CrawlProductAction productAction = new CrawlProductAction();
            productAction.setProductLink(li);
            productAction.setMainUrl(mainUrl);
            crawlProductActions.add(productAction);
        });
    }
}
