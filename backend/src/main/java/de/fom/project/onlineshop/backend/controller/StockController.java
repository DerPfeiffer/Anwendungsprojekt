package de.fom.project.onlineshop.backend.controller;

import de.fom.project.onlineshop.backend.model.Product;
import de.fom.project.onlineshop.backend.model.Stock;
import de.fom.project.onlineshop.backend.service.StockService;
import de.fom.project.onlineshop.backend.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("${rest.mapping.stock.base}")
public class StockController {

    private final StockService service;
    private final ProductController productController;

    @Autowired
    StockController(StockService service, ProductController productController) {
        this.service = service;
        this.productController = productController;
    }

    @GetMapping("${rest.mapping.stock.getAll}")
    public List<Stock> getAllProducer() {
        return service.getAll();
    }

    @GetMapping
    public Stock get(@RequestParam String id) {
        Long idParsed = Long.valueOf(id);

        return service.get(idParsed);
    }

    @SuppressWarnings("DuplicatedCode")
    @PutMapping
    public Stock put(@RequestParam String amount, @RequestParam String lastIncomming, @RequestParam String lastOutgoing, @RequestParam String shelf, @RequestParam String floor, @RequestParam String productId) throws ParseException {
        int amountParsed = Integer.parseInt(amount);
        Timestamp lastIncommingParsed = DateUtil.stringToDate(lastIncomming);
        Timestamp lastOutgoingParsed = DateUtil.stringToDate(lastOutgoing);
        int shelfParsed = Integer.parseInt(shelf);
        int floorParsed = Integer.parseInt(floor);
        Product productParsed = productController.get(productId);

        return service.put(amountParsed, lastIncommingParsed, lastOutgoingParsed, shelfParsed, floorParsed, productParsed);
    }

    @SuppressWarnings("DuplicatedCode")
    @PostMapping
    public Stock post(@RequestParam String id, @RequestParam String amount, @RequestParam String lastIncomming, @RequestParam String lastOutgoing, @RequestParam String shelf, @RequestParam String floor, @RequestParam String productId) throws ParseException {
        Long idParsed = Long.valueOf(id);
        int amountParsed = Integer.parseInt(amount);
        Timestamp lastIncommingParsed = DateUtil.stringToDate(lastIncomming);
        Timestamp lastOutgoingParsed = DateUtil.stringToDate(lastOutgoing);
        int shelfParsed = Integer.parseInt(shelf);
        int floorParsed = Integer.parseInt(floor);
        Product productParsed = productController.get(productId);

        return service.post(idParsed, amountParsed, lastIncommingParsed, lastOutgoingParsed, shelfParsed, floorParsed, productParsed);
    }

    @DeleteMapping
    public void delete(@RequestParam String id) {
        Long idParsed = Long.valueOf(id);

        service.delete(idParsed);
    }
}
