package de.fom.project.onlineshop.backend;

import de.fom.project.onlineshop.backend.model.ProductDao;
import de.fom.project.onlineshop.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class MockDataLoader implements ApplicationRunner {

    private ProductRepository productRepository;

    @Autowired
    public MockDataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void run(ApplicationArguments args) {
        productRepository.save(new ProductDao("Toilettenpapier"));
        productRepository.save(new ProductDao("Bachlorarbeit"));
    }

}
