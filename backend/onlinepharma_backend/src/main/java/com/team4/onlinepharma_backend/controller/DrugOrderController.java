package com.team4.onlinepharma_backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.team4.onlinepharma_backend.dao.DrugDao;
import com.team4.onlinepharma_backend.dao.DrugOrderDao;
import com.team4.onlinepharma_backend.dao.UserDao;
import com.team4.onlinepharma_backend.model.Drug;
import com.team4.onlinepharma_backend.model.DrugOrder;
import com.team4.onlinepharma_backend.model.User;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api")
public class DrugOrderController {

    @Autowired
    private DrugOrderDao orderDao;

    @Autowired
    private DrugDao drugDao;

    @Autowired
    private UserDao userDao;

    @PostMapping("/user/{userId}/orders")
    public DrugOrder placeOrder(@PathVariable Long userId, @RequestBody DrugOrder order) {
        Optional<User> userOpt = userDao.findById(userId);
        if (!userOpt.isPresent()) {
            throw new RuntimeException("User not found with ID: " + userId);
        }

        double total = 0;
        List<Drug> fullDrugs = new ArrayList<>();

        for (Drug drug : order.getDrugs()) {
            Optional<Drug> found = drugDao.getDrugById(drug.getId());
            if (found.isPresent()) {
                Drug d = found.get();
                total += d.getPrice();
                fullDrugs.add(d);
            }
        }

        order.setDrugs(fullDrugs);
        order.setUser(userOpt.get());
        order.setOrderAmount(total);

        return orderDao.saveOrder(order);
    }

    @GetMapping("/user/{userId}/orders")
    public List<DrugOrder> getOrdersByUserId(@PathVariable Long userId) {
        return orderDao.getOrdersByUserId(userId);
    }

    @GetMapping("/orders/{orderId}")
    public ResponseEntity<DrugOrder> getOrderById(@PathVariable Long orderId) {
        return orderDao.getOrderById(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}