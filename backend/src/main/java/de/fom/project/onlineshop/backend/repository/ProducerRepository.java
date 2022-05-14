package de.fom.project.onlineshop.backend.repository;

import de.fom.project.onlineshop.backend.model.Producer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProducerRepository extends JpaRepository<Producer, Long> {
    Producer findByName(String name);
}
