package com.webcrawler.controller

import com.webcrawler.model.ProductDto
import com.webcrawler.service.IFacadeCrawler
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class HomeController @Autowired constructor(private val facadeCrawler: IFacadeCrawler) {
    @GetMapping("/crawling")
    fun doCrawlOnLink(@RequestParam url: String): Boolean {
        return facadeCrawler.doCrawlOnLinkAndSave("https://magento-test.finology.com.my/breathe-easy-tank.html")
    }

    @GetMapping("/exhibitProducts")
    fun exhibitCrawlingProductResult(pageable: Pageable): Page<ProductDto> = facadeCrawler.exhibitCrawlingProductResult(pageable)
}
