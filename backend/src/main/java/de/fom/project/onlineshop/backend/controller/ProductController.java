package de.fom.project.onlineshop.backend.controller;

import de.fom.project.onlineshop.backend.model.ProductDao;
import de.fom.project.onlineshop.backend.service.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    private static final String MAPPING_PREFIX = "product/";
    private static final String MAPPING_GET_ALL = MAPPING_PREFIX + "all";

    private ProducerService service;

    public ProductController(@Autowired ProducerService service) {
        this.service = service;
    }

    @GetMapping(MAPPING_GET_ALL)
    public List<ProductDao> getAllProducts() {
        return service.getAllProducts();
    }
}
