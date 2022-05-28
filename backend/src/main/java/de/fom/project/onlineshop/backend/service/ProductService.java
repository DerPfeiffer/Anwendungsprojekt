package de.fom.project.onlineshop.backend.service;

import de.fom.project.onlineshop.backend.model.Producer;
import de.fom.project.onlineshop.backend.model.Product;
import de.fom.project.onlineshop.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;
    private final ProducerService producerService;

    @Autowired
    ProductService(ProductRepository repository, ProducerService producerService) {
        this.repository = repository;
        this.producerService = producerService;
    }

    public List<Product> getAll() {
        return repository.findAll();
    }

    public Product get(long id) {
        return repository.findById(id).orElse(null);
    }

    public Product put(String name, double price, long producerId) {
        Producer producer = producerService.getProducer(producerId);

        return repository.save(new Product(name, price, producer));
    }

    public Product post(long id, String name, double price, Producer producer) {
        Product product = get(id);
        product.setName(name);
        product.setPrice(price);
        product.setProducer(producer);

        return repository.save(product);
    }

    public void delete(long id) {
        repository.deleteById(id);
    }

}
