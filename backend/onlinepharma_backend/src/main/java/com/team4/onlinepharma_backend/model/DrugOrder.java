package com.team4.onlinepharma_backend.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class DrugOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double orderAmount;

    @ManyToMany
    @JoinTable(
        name = "order_drugs",
        joinColumns = @JoinColumn(name = "order_id"),
        inverseJoinColumns = @JoinColumn(name = "drug_id")
    )
    private List<Drug> drugs;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public double getOrderAmount() { return orderAmount; }
    public void setOrderAmount(double orderAmount) { this.orderAmount = orderAmount; }
    public List<Drug> getDrugs() { return drugs; }
    public void setDrugs(List<Drug> drugs) { this.drugs = drugs; }
}