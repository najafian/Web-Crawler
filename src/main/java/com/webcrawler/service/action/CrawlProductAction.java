package com.webcrawler.service.action;

import com.webcrawler.model.ProductExtraModel;
import com.webcrawler.model.ProductModel;
import com.webcrawler.service.util.JSoupUtil;
import com.webcrawler.service.util.URLUtils;
import org.jsoup.select.Elements;

import java.util.concurrent.RecursiveAction;

/**
 * This Class bring a concurrent processing for bringing products.
 */
public class CrawlProductAction extends RecursiveAction {
    private String mainUrl;
    private String productLink;
    private ProductModel productModel;

    @Override
    protected void compute() {
        processLinkUrls();
    }

    private void processLinkUrls() {
        String baseUrl = URLUtils.getBaseUrl(mainUrl);
        productLink = URLUtils.canonicalize(productLink, baseUrl);
        if (!URLUtils.skipProcessing(productLink, mainUrl)) {
            productModel = ExtractModelFromElements(productLink);
        }
    }

    private ProductModel ExtractModelFromElements(String linkUrl) {
        ProductModel productModel = new ProductModel();
        Elements productEl = JSoupUtil.getElementFromUrl(linkUrl, "div[class=column main]");
        if (productEl != null) {
            productModel.setName(productEl.select("span[data-ui-id=page-title-wrapper]").text());
            productModel.setPrice(productEl.select("span[class=price]").get(0).text());
            productModel.setDetail(productEl.select("div[class=product attribute description]").text());
            productModel.setProductExtraModel(getProductDetailModel(productEl));
        }
        return productModel;
    }

    private ProductExtraModel getProductDetailModel(Elements productEl) {
        ProductExtraModel detailModel = new ProductExtraModel();
        detailModel.setActivity(productEl.select("td[data-th=Activity]").text());
        detailModel.setClimate(productEl.select("td[data-th=Climate]").text());
        detailModel.setPattern(productEl.select("td[data-th=Pattern]").text());
        detailModel.setStyle(productEl.select("td[data-th=Style]").text());
        detailModel.setMaterial(productEl.select("td[data-th=Material]").text());
        detailModel.setCategory(productEl.select("td[data-th=Category]").text());
        detailModel.setGender(productEl.select("td[data-th=Gender(]").text());
        return detailModel;
    }

    public ProductModel getProductModel() {
        return productModel;
    }

    public void setProductLink(String productLink) {
        this.productLink = productLink;
    }

    public void setMainUrl(String mainUrl) {
        this.mainUrl = mainUrl;
    }
}
