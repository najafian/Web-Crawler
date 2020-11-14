package com.webcrawler.service.util;

/**
 * Exception class for errors encountered during the page fetch/parse operation, such as malformed URLs or
 * unreachable network, etc.
 * Note that non-HTTP 200 (OK) responses are NOT thrown as PageFetchExceptions. These are instead
 * returned as part of the PageFetchResults object.
 */
public class PageFetchException extends Exception {
    private static final long serialVersionUID = 1L;

    public PageFetchException(Exception e) {
        super(e);
    }

    public PageFetchException(String message) {
        super(message);
    }

    public PageFetchException(String message, Exception e) {
        super(message, e);
    }
}
