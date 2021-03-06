package de.fom.project.onlineshop.backend.controller;

import de.fom.project.onlineshop.backend.model.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class ProductControllerTest {

    @Autowired
    private ProductController controller;

    @Test
    public void getAll() {

        int expectedSize = 14;
        List<Product> products = controller.getAllProducts();

        assertThat(products.size()).isEqualTo(expectedSize);
    }

    @Test
    public void get(){
        String id = "11";
        Product product = controller.get(id);

        assertThat(product.getId()).isEqualTo(Long.valueOf(id));
        assertThat(product.getName()).isEqualTo("Bremsbacke");
        assertThat(product.getProducer()).isNotNull();
        assertThat(product.getProducer().getId()).isEqualTo(3L);
        assertThat(product.getProducer().getName()).isEqualTo("Brembo");
    }

    @Test
    public void put() {
        String name = "Neues Item";
        String price = "2.99";
        String producerId = "1";
        Product neues_item = controller.put(name, price, producerId);
        Product product = controller.get(String.valueOf(neues_item.getId()));

        assertThat(product).isNotNull();
        assertThat(neues_item.getName()).isEqualTo(product.getName());
        assertThat(neues_item.getPrice()).isEqualTo(product.getPrice());
    }

    @Test
    public void post() {
        String id = "11";
        String newName = "Helm";

        Product product = controller.get(id);
        product.setName(newName);
        controller.post(product.getId().toString(), product.getName(), String.valueOf(product.getPrice()), product.getProducer().getId().toString());
        assertThat(controller.get(id).getName()).isEqualTo(newName);
    }

    @Test
    public void delete() {
        String id = "11";
        controller.delete(id);

        assertThat(controller.get(id)).isNull();
    }
}
