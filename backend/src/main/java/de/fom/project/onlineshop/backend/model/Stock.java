package de.fom.project.onlineshop.backend.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private int amount;

    @NotNull
    private Timestamp lastIncomming;

    @NotNull
    private Timestamp lastOutgoing;

    @NotNull
    private int shelf;

    @NotNull
    private int floor;

    @NotNull
    @OneToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;

    public Stock(int amount, Timestamp lastIncomming, Timestamp lastOutgoing, int shelf, int floor, Product product) {
        this.amount = amount;
        this.lastIncomming = lastIncomming;
        this.lastOutgoing = lastOutgoing;
        this.shelf = shelf;
        this.floor = floor;
        this.product = product;
    }
}
