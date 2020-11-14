package com.webcrawler;

import com.webcrawler.model.ProductDto;
import com.webcrawler.service.IFacadeCrawler;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import static org.springframework.test.util.AssertionErrors.*;

@SpringBootTest
class WebCrawlerServiceTests {
    private static String SAMPLE_URL = "https://magento-test.finology.com.my/breathe-easy-tank.html";
    private IFacadeCrawler iFacadeCrawler;

    @Autowired
    WebCrawlerServiceTests(IFacadeCrawler iFacadeCrawler) {
        this.iFacadeCrawler = iFacadeCrawler;
    }

    @Test
    void CrawlUrlAndSaveItIntoSqlLiteDatabase() throws Exception {
        boolean isWorkingCorrectWithSampleURL = iFacadeCrawler.doCrawlOnLinkAndSave(SAMPLE_URL);
        assertTrue("All Product pages is saved into Sqlite Database Correctly!", isWorkingCorrectWithSampleURL);
    }

    @Test
    void showProductPagingResultFromSqlLiteDatabase() {
        Page<ProductDto> productDtos = iFacadeCrawler.exhibitCrawlingProductResult(PageRequest.of(0, 20, Sort.unsorted()));
        assertTrue("Result of product list", productDtos.getSize() > 0);
    }

}
