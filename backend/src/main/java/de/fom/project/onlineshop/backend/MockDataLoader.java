package de.fom.project.onlineshop.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.fom.project.onlineshop.backend.model.Producer;
import de.fom.project.onlineshop.backend.model.Product;
import de.fom.project.onlineshop.backend.model.Stock;
import de.fom.project.onlineshop.backend.repository.ProducerRepository;
import de.fom.project.onlineshop.backend.repository.ProductRepository;
import de.fom.project.onlineshop.backend.repository.StockRepository;
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
    private final Logger LOG = LoggerFactory.getLogger(MockDataLoader.class);

    private ProductRepository productRepository;
    private ProducerRepository producerRepository;
    private StockRepository stockRepository;
    private final ObjectMapper mapper = new ObjectMapper();

    @Value("classpath:mockData/producer.json")
    private Resource producerMockDataFile;

    @Value("classpath:mockData/product.json")
    private Resource productMockDataFile;

    @Value("classpath:mockData/stock.json")
    private Resource stockMockDataFile;

    @Autowired
    public MockDataLoader(ProductRepository productRepository, ProducerRepository producerRepository, StockRepository stockRepository) {
        this.productRepository = productRepository;
        this.producerRepository = producerRepository;
        this.stockRepository = stockRepository;
    }

    public MockDataLoader() {
    }

    public void run(ApplicationArguments args) throws IOException {
        loadData();
    }

    public void loadData() throws IOException {
        LOG.info("Start Loading MockData");

        LOG.info("Start Loading Producer");
        List<Producer> producer = mapper.readValue(producerMockDataFile.getInputStream(), mapper.getTypeFactory().constructCollectionType(List.class, Producer.class));
        producerRepository.saveAll(producer);
        LOG.info("Finished Loading Producer");

        LOG.info("Start Loading Product");
        List<Product> products = mapper.readValue(productMockDataFile.getInputStream(), mapper.getTypeFactory().constructCollectionType(List.class, Product.class));
        productRepository.saveAll(products);
        LOG.info("Finished Loading Product");

        LOG.info("Start Loading Stock");
        List<Stock> stocks = mapper.readValue(stockMockDataFile.getInputStream(), mapper.getTypeFactory().constructCollectionType(List.class, Stock.class));
        stockRepository.saveAll(stocks);
        LOG.info("Finished Loading Stock");

        LOG.info("Finished Loading MockData");
    }

    public void deleteData() {
        LOG.info("Deleting Data!");
        productRepository.deleteAll();
        producerRepository.deleteAll();
        stockRepository.deleteAll();
    }
}
