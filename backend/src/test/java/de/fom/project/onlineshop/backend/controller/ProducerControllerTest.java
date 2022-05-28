package de.fom.project.onlineshop.backend.controller;

import de.fom.project.onlineshop.backend.model.Producer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class ProducerControllerTest {

    @Autowired
    private ProducerController controller;

    @Test
    public void getAll() {
        int expectedSize = 8;
        List<Producer> producer = controller.getAllProducer();

        assertThat(producer.size()).isEqualTo(expectedSize);
    }

    @Test
    public void get(){
        String id = "1";
        Producer producer = controller.get(id);

        assertThat(producer.getId()).isEqualTo(Long.valueOf(id));
        assertThat(producer.getName()).isEqualTo("Alpina");
    }

    @Test
    public void put() {
        String name = "Neuer Produzent";
        Producer neues_item = controller.put(name);
        Producer producer = controller.get(String.valueOf(neues_item.getId()));

        assertThat(producer).isNotNull();
        assertThat(neues_item.getName()).isEqualTo(producer.getName());
    }

    @Test
    public void post() {
        String id = "1";
        String newName = "Mein neuer Name";

        Producer producer = controller.get(id);
        producer.setName(newName);
        controller.post(producer.getId().toString(), producer.getName());
        assertThat(controller.get(id).getName()).isEqualTo(newName);
    }

    @Test
    public void delete() {
        String id = "1";
        controller.delete(id);

        assertThat(controller.get(id)).isNull();
    }
}
