package com.webcrawler.model

import java.io.Serializable
import javax.persistence.*


@Entity
@Table(name = "products")
class ProductModel : Serializable {
    private val serialVersionUID = 1L

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "product_id")
    var id: Int? = null

    @Column
    var name: String? = null

    @Column
    var price: String? = null

    @Column
    var detail: String? = null


    @OneToOne(cascade = [CascadeType.PERSIST, CascadeType.REMOVE])
    @JoinColumn(name = "extra_id", referencedColumnName = "extra_id")
    var productExtraModel: ProductExtraModel? = null


}
