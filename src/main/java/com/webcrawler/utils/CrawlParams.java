package com.webcrawler.utils;

public interface CrawlParams {
    public final int MAX_WAIT_SECS_BETWEEN_CRAWLS = 5;
    public static final int DEFAULT_MAX_INTERNAL_LINKS = 3000;
    public static final boolean DEFAULT_SHOW_VISITED_LINK = true;
    public static final int DEFAULT_CRAWL_REPETITIONS = 1;
    public static int DEFAULT_CRAWL_URL = 1;
    public static final int MAX_CRAWL_REPETITIONS = 10;
    public int maxInternalLinks = DEFAULT_MAX_INTERNAL_LINKS;
    public boolean showVisitedLink = DEFAULT_SHOW_VISITED_LINK;
    public int numRepetitions = DEFAULT_CRAWL_REPETITIONS;
}
