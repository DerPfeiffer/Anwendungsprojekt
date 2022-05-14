package de.fom.project.onlineshop.backend.controller;

import de.fom.project.onlineshop.backend.model.Product;
import de.fom.project.onlineshop.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${rest.mapping.product.base}")
public class ProductController {

    private ProductService service;

    public ProductController(@Autowired ProductService service) {
        this.service = service;
    }

    @GetMapping("${rest.mapping.product.getAll}")
    public List<Product> getAllProducts() {
        return service.getAll();
    }
    
    @GetMapping
    public Product get (@RequestParam String id) {
        return service.get(Long.valueOf(id));
    }

    @PutMapping
    public Product put(@RequestParam String name, @RequestParam String producerId) {
        return service.put(name, producerId);
    }

    @PostMapping
    public Product post(@RequestParam String id, @RequestParam String name, @RequestParam String producerId) {
        return service.post(Long.valueOf(id), name, Long.valueOf(producerId));
    }

    @DeleteMapping
    public void delete(@RequestParam String id) {
        service.delete(Long.valueOf(id));
    }
}
