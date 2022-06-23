package de.fom.project.onlineshop.backend.controller;

import de.fom.project.onlineshop.backend.model.Product;
import de.fom.project.onlineshop.backend.model.Stock;
import de.fom.project.onlineshop.backend.service.StockService;
import de.fom.project.onlineshop.backend.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
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

    @PutMapping
    public Stock put(@RequestParam String amount, @RequestParam String thresholdAmount, @RequestParam String lastIncoming, @RequestParam String lastOutgoing, @RequestParam String shelf, @RequestParam String floor, @RequestParam String productId) throws ParseException {
        Stock stockByProduct = service.getByProduct(Long.parseLong(productId));
        if (stockByProduct == null) {
            int amountParsed = Integer.parseInt(amount);
            int thresholdAmountParsed = thresholdAmount.equals("") ? 0 : Integer.parseInt(thresholdAmount);
            Timestamp lastincomingParsed = DateUtil.stringToDate(lastIncoming);
            Timestamp lastOutgoingParsed = DateUtil.stringToDate(lastOutgoing);
            int shelfParsed = Integer.parseInt(shelf);
            int floorParsed = Integer.parseInt(floor);
            Product productParsed = productController.get(productId);

            return service.put(amountParsed, thresholdAmountParsed, lastincomingParsed, lastOutgoingParsed, shelfParsed, floorParsed, productParsed);
        } else {
            return null;
        }
    }

    @PostMapping
    public Stock post(@RequestParam String id, @RequestParam String amount, @RequestParam String thresholdAmount, @RequestParam String shelf, @RequestParam String floor, @RequestParam String productId) {
        Long idParsed = Long.valueOf(id);
        Stock stockByProduct = service.getByProduct(Long.parseLong(productId));
        if (stockByProduct == null || (stockByProduct != null && stockByProduct.getId() == idParsed)) {
            int amountParsed = Integer.parseInt(amount);
            int thresholdAmountParsed = Integer.parseInt(thresholdAmount);
            boolean stockWarning = amountParsed <= thresholdAmountParsed;
            int shelfParsed = Integer.parseInt(shelf);
            int floorParsed = Integer.parseInt(floor);
            Product productParsed = productController.get(productId);

            return service.post(idParsed, amountParsed, thresholdAmountParsed, shelfParsed, floorParsed, productParsed);
        } else {
            return null;
        }
    }

    @DeleteMapping
    public void delete(@RequestParam String id) {
        Long idParsed = Long.valueOf(id);

        service.delete(idParsed);
    }
}
