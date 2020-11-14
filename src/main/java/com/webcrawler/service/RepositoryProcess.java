package com.webcrawler.service;

import com.webcrawler.model.ProductDto;
import com.webcrawler.model.ProductExtraDto;
import com.webcrawler.model.ProductExtraModel;
import com.webcrawler.model.ProductModel;
import com.webcrawler.repository.ProductRepository;
import com.webcrawler.service.action.CrawlProductAction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class RepositoryProcess {
    private ProductRepository productRepository;

    public RepositoryProcess(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public boolean saveProducts(Collection<CrawlProductAction> crawlProductActions) {
        crawlProductActions.stream().forEach(productAction -> {
                    if (productAction.getProductModel() != null)
                        productRepository.save(productAction.getProductModel());
                }
        );
        return true;
    }

    public Page<ProductDto> getPageableProductResults(Pageable page) {
        Page<ProductModel> result = productRepository.findAll(page);
        Page<ProductDto> productDtoPage = result.map(m -> {
            ProductExtraDto extraDto = new ProductExtraDto();
            ProductExtraModel extraModel = m.getProductExtraModel();
            if (extraModel != null) {
                extraDto.copy(
                        extraModel.getActivity(),
                        extraModel.getStyle(),
                        extraModel.getMaterial(),
                        extraModel.getPattern(),
                        extraModel.getClimate(),
                        extraModel.getGender(),
                        extraModel.getCategory());
            }
            return new ProductDto(m.getName(), m.getPrice(), m.getDetail(), extraDto);
        });
        return productDtoPage;
    }
}
