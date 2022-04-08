package de.fom.project.onlineshop.backend.repository;

import de.fom.project.onlineshop.backend.model.ProductDao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductDao, Long> {
}
