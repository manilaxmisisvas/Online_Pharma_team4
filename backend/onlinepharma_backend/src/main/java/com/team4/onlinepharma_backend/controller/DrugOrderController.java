package com.team4.onlinepharma_backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    // User places an order
    // http://localhost:8080/api/user/{userId}/orders
    @PostMapping("/user/{userId}/orders")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> placeOrder(@PathVariable Long userId, @RequestBody DrugOrder order) {
        Optional<User> userOpt = userDao.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        double total = 0;
        List<Drug> fullDrugs = new ArrayList<>();

        for (Drug requestedDrug : order.getDrugs()) {
            Optional<Drug> found = drugDao.getDrugById(requestedDrug.getId());

            if (found.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Drug with ID " + requestedDrug.getId() + " not found");
            }

            Drug actualDrug = found.get();

            if (actualDrug.getQuantity() < 1 || actualDrug.getQuantity() < requestedDrug.getQuantity()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Not enough stock for drug: " + actualDrug.getName());
            }

            actualDrug.setQuantity(actualDrug.getQuantity() - requestedDrug.getQuantity());
            drugDao.saveDrug(actualDrug);

            total += actualDrug.getPrice() * requestedDrug.getQuantity();

            Drug orderDrug = new Drug();
            orderDrug.setId(actualDrug.getId());
            orderDrug.setName(actualDrug.getName());
            orderDrug.setPrice(actualDrug.getPrice());
            orderDrug.setQuantity(requestedDrug.getQuantity());

            fullDrugs.add(orderDrug);
        }

        order.setUser(userOpt.get());
        order.setDrugs(fullDrugs);
        order.setOrderAmount(total);

        return ResponseEntity.ok(orderDao.saveOrder(order));
    }

    // User views their own orders
    // http://localhost:8080/api/user/{userId}/orders
    @GetMapping("/user/{userId}/orders")
    @PreAuthorize("hasRole('USER')")
    public List<DrugOrder> getOrdersByUserId(@PathVariable Long userId) {
        return orderDao.getOrdersByUserId(userId);
    }

    // Fetch order by ID
    // http://localhost:8080/api/orders/{orderId}
    @GetMapping("/orders/{orderId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<DrugOrder> getOrderById(@PathVariable Long orderId) {
        return orderDao.getOrderById(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin sees all orders
    // http://localhost:8080/api/admin/orders
    @GetMapping("/admin/orders")
    @PreAuthorize("hasRole('ADMIN')")
    public List<DrugOrder> getAllOrders() {
        return orderDao.getAllOrders();
    }

    // User updates their own order
    // http://localhost:8080/api/user/{userId}/orders/{orderId}
    @PutMapping("/user/{userId}/orders/{orderId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateOrder(@PathVariable Long userId, @PathVariable Long orderId, @RequestBody DrugOrder updatedOrder) {
        Optional<User> userOpt = userDao.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Optional<DrugOrder> orderOpt = orderDao.getOrderById(orderId);
        if (orderOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }

        DrugOrder existingOrder = orderOpt.get();
        if (existingOrder.getUser().getId() != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only update your own orders");
        }

        // Restore original drug quantities
        for (Drug drug : existingOrder.getDrugs()) {
            Optional<Drug> actualDrugOpt = drugDao.getDrugById(drug.getId());
            if (actualDrugOpt.isPresent()) {
                Drug actualDrug = actualDrugOpt.get();
                actualDrug.setQuantity(actualDrug.getQuantity() + drug.getQuantity());
                drugDao.saveDrug(actualDrug);
            }
        }

        // Process updated order
        double total = 0;
        List<Drug> fullDrugs = new ArrayList<>();

        for (Drug requestedDrug : updatedOrder.getDrugs()) {
            Optional<Drug> found = drugDao.getDrugById(requestedDrug.getId());
            if (found.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Drug with ID " + requestedDrug.getId() + " not found");
            }

            Drug actualDrug = found.get();
            if (actualDrug.getQuantity() < 1 || actualDrug.getQuantity() < requestedDrug.getQuantity()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Not enough stock for drug: " + actualDrug.getName());
            }

            actualDrug.setQuantity(actualDrug.getQuantity() - requestedDrug.getQuantity());
            drugDao.saveDrug(actualDrug);

            total += actualDrug.getPrice() * requestedDrug.getQuantity();

            Drug orderDrug = new Drug();
            orderDrug.setId(actualDrug.getId());
            orderDrug.setName(actualDrug.getName());
            orderDrug.setPrice(actualDrug.getPrice());
            orderDrug.setQuantity(requestedDrug.getQuantity());

            fullDrugs.add(orderDrug);
        }

        existingOrder.setDrugs(fullDrugs);
        existingOrder.setOrderAmount(total);
        return ResponseEntity.ok(orderDao.saveOrder(existingOrder));
    }

    // User deletes/cancels their own order
    // http://localhost:8080/api/user/{userId}/orders/{orderId}
    @DeleteMapping("/user/{userId}/orders/{orderId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> deleteOrder(@PathVariable Long userId, @PathVariable Long orderId) {
        Optional<User> userOpt = userDao.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Optional<DrugOrder> orderOpt = orderDao.getOrderById(orderId);
        if (orderOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }

        DrugOrder order = orderOpt.get();
        if (order.getUser().getId() != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only cancel your own orders");
        }

        // Restore drug quantities
        for (Drug drug : order.getDrugs()) {
            Optional<Drug> actualDrugOpt = drugDao.getDrugById(drug.getId());
            if (actualDrugOpt.isPresent()) {
                Drug actualDrug = actualDrugOpt.get();
                actualDrug.setQuantity(actualDrug.getQuantity() + drug.getQuantity());
                drugDao.saveDrug(actualDrug);
            }
        }

        orderDao.deleteOrder(orderId);
        return ResponseEntity.ok("Order canceled successfully");
    }
}