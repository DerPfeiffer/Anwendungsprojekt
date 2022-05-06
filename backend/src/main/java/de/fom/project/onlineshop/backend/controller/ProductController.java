package de.fom.project.onlineshop.backend.controller;

import de.fom.project.onlineshop.backend.model.ProductDao;
import de.fom.project.onlineshop.backend.service.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${rest.mapping.product.base}")
public class ProductController {

    private ProducerService service;

    public ProductController(@Autowired ProducerService service) {
        this.service = service;
    }

    @GetMapping("${rest.mapping.product.getAll}")
    public List<ProductDao> getAllProducts() {
        return service.getAllProducts();
    }
}
