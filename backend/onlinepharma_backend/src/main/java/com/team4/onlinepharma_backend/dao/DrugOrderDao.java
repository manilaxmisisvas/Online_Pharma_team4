package com.team4.onlinepharma_backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team4.onlinepharma_backend.model.DrugOrder;
import com.team4.onlinepharma_backend.repo.DrugOrderRepository;

@Repository
public class DrugOrderDao {
    @Autowired
    private DrugOrderRepository orderRepo;

    public DrugOrder saveOrder(DrugOrder order) {
        return orderRepo.save(order);
    }

    public List<DrugOrder> getAllOrders() {
        return orderRepo.findAll();
    }

    public Optional<DrugOrder> getOrderById(Long id) {
        return orderRepo.findById(id);
    }

    public List<DrugOrder> getOrdersByUserId(Long userId) {
        return orderRepo.findByUserId(userId);
    }
    
    public void deleteOrder(Long orderId) {
        orderRepo.deleteById(orderId);
    }

}