package de.fom.project.onlineshop.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.fom.project.onlineshop.backend.model.Producer;
import de.fom.project.onlineshop.backend.model.Product;
import de.fom.project.onlineshop.backend.repository.ProducerRepository;
import de.fom.project.onlineshop.backend.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class MockDataLoader implements ApplicationRunner {
    private Logger LOG = LoggerFactory.getLogger(MockDataLoader.class);

    private ProductRepository productRepository;
    private ProducerRepository producerRepository;
    private ObjectMapper mapper = new ObjectMapper();
    @Value("classpath:mockData.json")
    private Resource mockDataFile;

    @Autowired
    public MockDataLoader(ProductRepository productRepository, ProducerRepository producerRepository) {
        this.productRepository = productRepository;
        this.producerRepository = producerRepository;
    }

    public MockDataLoader() {
    }

    public void run(ApplicationArguments args) throws IOException {
        loadData();
    }

    public void loadData() throws IOException {
        LOG.info("Start Loading MockData");
        List<Product> products = mapper.readValue(mockDataFile.getFile(), mapper.getTypeFactory().constructCollectionType(List.class, Product.class));
        products.forEach(product ->  {
            Producer producer = product.getProducer();
            Producer producerDatabase = producerRepository.findByName(producer.getName());
            if(producerDatabase == null) {
                producer = producerRepository.save(producer);
            } else {
                product.setProducer(producerDatabase);
            }

            productRepository.save(product);
        });
        LOG.info("Finished Loading MockData");

    }

    public void deleteData() {
        LOG.info("Deleting Data!");
        productRepository.deleteAll();
        producerRepository.deleteAll();
    }
}
