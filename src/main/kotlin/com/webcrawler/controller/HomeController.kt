package com.webcrawler.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HomeController @Autowired constructor() {
    @GetMapping
    fun test(): List<*> =
         ArrayList<String>()
}
