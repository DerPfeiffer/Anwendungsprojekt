package de.fom.project.onlineshop.backend.service;

import de.fom.project.onlineshop.backend.model.Producer;
import de.fom.project.onlineshop.backend.repository.ProducerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProducerService {

    private ProducerRepository repository;

    @Autowired
    ProducerService(ProducerRepository repository) {
        this.repository = repository;
    }

    public Producer getProducer(long id) {
        return repository.getById(id);
    }

    public List<Producer> getAll() {
        return repository.findAll();
    }

    public Producer get(long id) {
        Optional<Producer> optionalProducer = repository.findById(id);
        if(optionalProducer.isPresent()) {
            return optionalProducer.get();
        } else {
            return null;
        }
    }

    public Producer put(String name) {
        return repository.save(new Producer(name));
    }

    public Producer post(long id, String name) {
        Producer producer = get(id);
        producer.setName(name);

        return repository.save(producer);
    }

    public void delete(long id) {
        repository.deleteById(id);
    }
}

