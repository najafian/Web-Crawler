package com.webcrawler.controller

import com.webcrawler.model.ProductDto
import com.webcrawler.service.IFacadeCrawler
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class WebCrawlingController @Autowired constructor(private val facadeCrawler: IFacadeCrawler) {
    @GetMapping("/crawling")
    fun doCrawlOnLink(@RequestParam url: String) =
            ResponseEntity(facadeCrawler.doCrawlOnLinkAndSave(url), HttpStatus.OK)

    @GetMapping("/exhibitProducts")
    fun exhibitCrawlingProductResult(pageable: Pageable, @RequestParam pagerAction: Boolean): ResponseEntity<*> {
        val exhibitCrawlingProductResult: Page<ProductDto?> = facadeCrawler.exhibitCrawlingProductResult(pageable, pagerAction)
       return ResponseEntity(mapOf(
                "Pageable" to exhibitCrawlingProductResult,
                "pageIndex" to pageable.pageNumber,
                "pagerAction" to pagerAction
        ), HttpStatus.OK)
    }

}
