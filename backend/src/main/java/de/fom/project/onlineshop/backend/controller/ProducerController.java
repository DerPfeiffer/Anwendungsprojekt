package de.fom.project.onlineshop.backend.controller;

import de.fom.project.onlineshop.backend.model.Producer;
import de.fom.project.onlineshop.backend.service.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${rest.mapping.producer.base}")
public class ProducerController {

    private ProducerService service;

    @Autowired
    ProducerController(ProducerService service) {
        this.service = service;
    }

    @GetMapping("${rest.mapping.producer.getAll}")
    public List<Producer> getAllProducer() {
        return service.getAll();
    }

    @GetMapping
    public Producer get (@RequestParam String id) {
        return service.get(Long.valueOf(id));
    }

    @PutMapping
    public Producer put(@RequestParam String name) {
        return service.put(name);
    }

    @PostMapping
    public Producer post(@RequestParam String id, @RequestParam String name) {
        return service.post(Long.valueOf(id), name);
    }

    @DeleteMapping
    public void delete(@RequestParam String id) {
        service.delete(Long.valueOf(id));
    }
}
