package com.webcrawler.service.util;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;


public class JSoupUtil {
    private static final Logger log = LoggerFactory.getLogger(JSoupUtil.class);

    public static Elements getElementFromUrl(String url, String pattern) {
        Elements select = null;
        Connection connect = Jsoup.connect(url);
//        synchronized (connect) {
        Document doc;
        try {
            doc = connect.get();
            select = doc.select(pattern);
            log.info("Visited url: " + url);
        } catch (IOException e) {
            log.error("Can not connect to URL " + url, e);
        }
//        }
        return select;
    }
}
