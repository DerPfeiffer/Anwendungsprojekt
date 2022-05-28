package de.fom.project.onlineshop.backend.controller;

import de.fom.project.onlineshop.backend.model.Producer;
import de.fom.project.onlineshop.backend.model.Product;
import de.fom.project.onlineshop.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${rest.mapping.product.base}")
public class ProductController {

    private final ProductService service;
    private final ProducerController producerController;

    @Autowired
    public ProductController(ProductService service, ProducerController producerController) {
        this.service = service;
        this.producerController = producerController;
    }

    @GetMapping("${rest.mapping.product.getAll}")
    public List<Product> getAllProducts() {
        return service.getAll();
    }

    @GetMapping
    public Product get(@RequestParam String id) {
        long idParsed = Long.parseLong(id);

        return service.get(idParsed);
    }

    @PutMapping
    public Product put(@RequestParam String name, @RequestParam String price, @RequestParam String producerId) {
        double priceParsed = Double.parseDouble(price);
        long producerIdParsed = Long.parseLong(producerId);

        return service.put(name, priceParsed, producerIdParsed);
    }

    @PostMapping
    public Product post(@RequestParam String id, @RequestParam String name, @RequestParam String price, @RequestParam String producerId) {
        long idParsed = Long.parseLong(id);
        double priceParsed = Double.parseDouble(price);
        Producer producer = producerController.get(producerId);

        return service.post(idParsed, name, priceParsed, producer);
    }

    @DeleteMapping
    public void delete(@RequestParam String id) {
        long idParsed = Long.parseLong(id);

        service.delete(idParsed);
    }
}
