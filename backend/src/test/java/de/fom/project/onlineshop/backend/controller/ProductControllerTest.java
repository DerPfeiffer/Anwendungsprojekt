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
        String id = "2";
        Product product = controller.get(id);

        assertThat(product.getId()).isEqualTo(Long.valueOf(id));
        assertThat(product.getName()).isEqualTo("Ritzel");
        assertThat(product.getProducer()).isNotNull();
    }

    @Test
    public void put() {
        String name = "Neues Item";
        String producerId = "1";
        Product neues_item = controller.put(name, producerId);
        Product product = controller.get(String.valueOf(neues_item.getId()));

        assertThat(product).isNotNull();
        assertThat(neues_item.getName()).isEqualTo(product.getName());
    }

    @Test
    public void post() {
        String id = "2";
        String newName = "Helm";

        Product product = controller.get(id);
        product.setName(newName);
        controller.post(product.getId().toString(), product.getName(), product.getProducer().getId().toString());
        assertThat(controller.get(id).getName()).isEqualTo(newName);
    }

    @Test
    public void delete() {
        String id = "2";
        controller.delete(id);

        assertThat(controller.get(id)).isNull();
    }
}
