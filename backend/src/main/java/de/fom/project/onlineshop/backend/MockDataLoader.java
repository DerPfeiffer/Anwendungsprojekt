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

    @Value("classpath:mockData/producer.json")
    private Resource producerMockDataFile;

    @Value("classpath:mockData/product.json")
    private Resource productMockDataFile;

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

        LOG.info("Start Loading Producer");
        List<Producer> producer = mapper.readValue(producerMockDataFile.getFile(), mapper.getTypeFactory().constructCollectionType(List.class, Producer.class));
        producer.forEach(producerEntity -> {
            producerRepository.save(producerEntity);
        });
        LOG.info("Finished Loading Producer");

        LOG.info("Start Loading Product");
        List<Product> products = mapper.readValue(productMockDataFile.getFile(), mapper.getTypeFactory().constructCollectionType(List.class, Product.class));
        products.forEach(productEntity ->  {
            productRepository.save(productEntity);
        });
        LOG.info("Finished Loading Product");

        LOG.info("Finished Loading MockData");

    }

    public void deleteData() {
        LOG.info("Deleting Data!");
        productRepository.deleteAll();
        producerRepository.deleteAll();
    }
}
