package de.fom.project.onlineshop.backend.controller;

import de.fom.project.onlineshop.backend.model.Stock;
import de.fom.project.onlineshop.backend.util.DateUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.text.ParseException;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class StockTest {

    @Autowired
    private StockController controller;

    @Autowired
    ProductController productController;

    @Test
    public void getAll() {
        int expectedSize = 8;
        List<Stock> stocks = controller.getAllProducer();

        assertThat(stocks.size()).isEqualTo(expectedSize);
    }

    @Test
    public void get() throws ParseException {
        String id = "23";
        Stock stock = controller.get(id);

        assertThat(stock.getId()).isEqualTo(Long.valueOf(id));
        assertThat(stock.getAmount()).isEqualTo(10);
        assertThat(stock.getFloor()).isEqualTo(1);
        assertThat(stock.getLastIncoming()).isEqualTo(DateUtil.stringToDate("2022-05-28T21:38:44+0000"));
        assertThat(stock.getLastOutgoing()).isEqualTo(DateUtil.stringToDate("2022-05-29T21:38:44+0000"));
        assertThat(stock.getShelf()).isEqualTo(1);
        assertThat(stock.getProduct().getId()).isEqualTo(9L);
    }

    @Test
    public void put() throws ParseException {
        Stock neues_item = controller.put("9", "","2022-05-28T21:38:44+0000", "2022-05-30T21:38:44+0000", "8", "9", String.valueOf(productController.get("9").getId()));
        Stock stock = controller.get(String.valueOf(neues_item.getId()));

        assertThat(stock).isNotNull();
        assertThat(neues_item.getAmount()).isEqualTo(stock.getAmount());
        assertThat(neues_item.getFloor()).isEqualTo(stock.getFloor());
        assertThat(neues_item.getLastIncoming()).isEqualTo(stock.getLastIncoming());
        assertThat(neues_item.getLastOutgoing()).isEqualTo(stock.getLastOutgoing());
        assertThat(neues_item.getShelf()).isEqualTo(stock.getShelf());
        assertThat(neues_item.getProduct().getId()).isEqualTo(stock.getProduct().getId());

    }

    @Test
    public void delete() {
        String id = "23";
        controller.delete(id);

        assertThat(controller.get(id)).isNull();
    }
}
