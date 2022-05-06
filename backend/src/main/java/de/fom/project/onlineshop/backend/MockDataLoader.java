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
        productRepository.save(new ProductDao("Milch"));
        productRepository.save(new ProductDao("Käse"));
        productRepository.save(new ProductDao("Salami"));
        productRepository.save(new ProductDao("Quark"));
        productRepository.save(new ProductDao("Headset"));
        productRepository.save(new ProductDao("Blumenerde"));
        productRepository.save(new ProductDao("Buntstifte"));
        productRepository.save(new ProductDao("Whiteboard-Marker"));
        productRepository.save(new ProductDao("Schwamm"));
        productRepository.save(new ProductDao("Schreibtisch"));
    }

}
