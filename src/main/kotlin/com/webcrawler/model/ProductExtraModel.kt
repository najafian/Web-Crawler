package com.webcrawler.model

import java.io.Serializable
import javax.persistence.*

@Entity
@Table(name = "detail")
class ProductExtraModel : Serializable {
    private val serialVersionUID = 1L

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "extra_id")
    var id: Int? = null

    var activity: String? = null
    var style: String? = null
    var material: String? = null
    var pattern: String? = null
    var climate: String? = null
    var gender: String? = null
    var category: String? = null
}
