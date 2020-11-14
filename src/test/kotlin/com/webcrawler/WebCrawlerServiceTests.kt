//package com.webcrawler
//
//import com.webcrawler.service.IFacadeCrawler
//import org.junit.jupiter.api.Test
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.boot.test.context.SpringBootTest
//import org.springframework.data.domain.PageRequest
//import org.springframework.data.domain.Sort
//import org.springframework.test.util.AssertionErrors
//
//@SpringBootTest
//internal class WebCrawlerServiceTests @Autowired constructor(private val iFacadeCrawler: IFacadeCrawler) {
//    companion object {
//        private const val SAMPLE_URL = "https://magento-test.finology.com.my/breathe-easy-tank.html"
//    }
//
//    @Test
//    @Throws(Exception::class)
//    fun CrawlUrlAndSaveItIntoSqlLiteDatabase() {
//        val isWorkingCorrectWithSampleURL = iFacadeCrawler.doCrawlOnLinkAndSave(SAMPLE_URL)
//        AssertionErrors.assertTrue("All Product pages is saved into Sqlite Database Correctly!", isWorkingCorrectWithSampleURL)
//    }
//
//    @Test
//    fun showProductPagingResultFromSqlLiteDatabase() {
//        val productListDtos = iFacadeCrawler.exhibitCrawlingProductResult(PageRequest.of(0, 20, Sort.unsorted()))
//        AssertionErrors.assertTrue("Result of product list", productListDtos.size > 0)
//    }
//
//}
