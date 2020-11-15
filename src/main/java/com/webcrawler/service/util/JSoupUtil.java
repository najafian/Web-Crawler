package com.webcrawler.service.util;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;


public class JSoupUtil {
    private static final Logger log = LoggerFactory.getLogger(JSoupUtil.class);
    private static final String ABSOLUTE_HREF_ATTRIBUTE = "abs:href";

    public static Elements getElementFromUrl(String url, String pattern) {
        Elements select = null;
        Connection connect = Jsoup.connect(url);
        connect.timeout(10 * 1000);
        synchronized (connect) {
            Document doc;
            try {
                doc = connect.get();
                select = doc.select(pattern);
                log.info("Visited url: " + url);
            } catch (IOException e) {
                log.error("Can not connect to URL " + url, e);
            }
        }
        return select;
    }

    public static Set<String> extractHtmlLink(Elements elements) {
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
}
