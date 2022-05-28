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

    private ProductService service;
    private ProducerController producerController;

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
        Long idParsed = Long.valueOf(id);

        return service.get(idParsed);
    }

    @PutMapping
    public Product put(@RequestParam String name, @RequestParam String price, @RequestParam String producerId) {
        Double priceParsed = Double.valueOf(price);
        Long producerIdParsed = Long.valueOf(producerId);

        return service.put(name, priceParsed, producerIdParsed);
    }

    @PostMapping
    public Product post(@RequestParam String id, @RequestParam String name, @RequestParam String price, @RequestParam String producerId) {
        Long idParsed = Long.valueOf(id);
        Double priceParsed = Double.valueOf(price);
        Producer producer = producerController.get(producerId);

        return service.post(idParsed, name, priceParsed, producer);
    }

    @DeleteMapping
    public void delete(@RequestParam String id) {
        Long idParsed = Long.valueOf(id);

        service.delete(idParsed);
    }
}
