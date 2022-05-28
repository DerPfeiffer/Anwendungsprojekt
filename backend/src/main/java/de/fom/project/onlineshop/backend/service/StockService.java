package de.fom.project.onlineshop.backend.service;


import de.fom.project.onlineshop.backend.model.Product;
import de.fom.project.onlineshop.backend.model.Stock;
import de.fom.project.onlineshop.backend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class StockService {

    private final StockRepository repository;

    @Autowired
    StockService(StockRepository repository) {
        this.repository = repository;
    }

    public List<Stock> getAll() {
        return repository.findAll();
    }

    public Stock get(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Stock put(int amount, Timestamp lastIncomming, Timestamp lastOutgoing, int shelf, int floor, Product product) {
        return repository.save(new Stock(amount, lastIncomming, lastOutgoing, shelf, floor, product));
    }

    public Stock post(Long id, int amount, Timestamp lastIncomming, Timestamp lastOutgoing, int shelf, int floor, Product product) {
        Stock stock = get(id);
        stock.setAmount(amount);
        stock.setLastIncomming(lastIncomming);
        stock.setLastOutgoing(lastOutgoing);
        stock.setShelf(shelf);
        stock.setFloor(floor);
        stock.setProduct(product);

        return repository.save(stock);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}