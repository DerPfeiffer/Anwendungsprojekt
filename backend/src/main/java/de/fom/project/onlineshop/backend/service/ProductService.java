package de.fom.project.onlineshop.backend.service;

import de.fom.project.onlineshop.backend.model.Producer;
import de.fom.project.onlineshop.backend.model.Product;
import de.fom.project.onlineshop.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private ProductRepository repository;
    private ProducerService producerService;

    @Autowired
    ProductService(ProductRepository repository, ProducerService producerService) {
        this.repository = repository;
        this.producerService = producerService;
    }

    public List<Product> getAll() {
        return repository.findAll();
    }

    public Product get(Long id) {
        Optional<Product> productOptional = repository.findById(id);
        if (productOptional.isPresent()) {
            return productOptional.get();
        } else {
            return null;
        }
    }

    public Product put(String name, String price, String producerId) {
        return repository.save(new Product(name, Double.valueOf(price), producerService.getProducer(Long.valueOf(producerId))));
    }

    public Product post(Long id, String name, String price, Long producerId) {
        return repository.save(new Product(id, name, Double.valueOf(price), producerService.getProducer(producerId)));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void deleteByProducer(Producer producer) {
        repository.deleteByProducer(producer);
    }

}
