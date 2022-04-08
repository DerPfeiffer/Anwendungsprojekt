package de.fom.project.onlineshop.backend.service;

import de.fom.project.onlineshop.backend.model.ProductDao;
import de.fom.project.onlineshop.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProducerService {

    private ProductRepository repository;

    @Autowired
    ProducerService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<ProductDao> getAllProducts() {
        return repository.findAll();
    }

}
