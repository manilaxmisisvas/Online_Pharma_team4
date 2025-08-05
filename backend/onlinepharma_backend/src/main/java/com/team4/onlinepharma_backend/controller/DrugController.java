package com.team4.onlinepharma_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team4.onlinepharma_backend.dao.DrugDao;
import com.team4.onlinepharma_backend.model.Drug;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RestController
@RequestMapping("/api")
public class DrugController {

    @Autowired
    private DrugDao drugDao;

    // Public endpoint: Only non-banned drugs - no change here
    //http://localhost:8080/api/drugs
    @GetMapping("/drugs")
    public List<Drug> getAllAvailableDrugs() {
        return drugDao.getAllAvailableDrugs();
    }

    // Admin endpoint: Get all drugs (including banned)
    //http://localhost:8080/api/admin/drug-items/all
    @GetMapping("/admin/drug-items/all")  
    @PreAuthorize("hasRole('ADMIN')")
    public List<Drug> getAllDrugsForAdmin() {
        return drugDao.getAllDrugs();
    }

    //http://localhost:8080/api/drugs/4
    @GetMapping("/drugs/{id}")
    public ResponseEntity<?> getDrugById(@PathVariable Long id) {
        Optional<Drug> drugOpt = drugDao.getDrugById(id);
        
        if (drugOpt.isEmpty()) {
            return ResponseEntity.notFound().build();  // 404 if not found
        }

        Drug drug = drugOpt.get();
        
        if (drug.isBanned()) {
            return ResponseEntity.status(403).body("Access denied: This drug is not available to users.");
        }

        return ResponseEntity.ok(drug);  // 200 with drug details
    }

    
    // Admin endpoint: Add a new drug
    //http://localhost:8080/api/admin/drug-items
    @PostMapping("/admin/drug-items")
    @PreAuthorize("hasRole('ADMIN')")
    public Drug addDrug(@RequestBody Drug drug) {
        System.out.println("Auth: " + SecurityContextHolder.getContext().getAuthentication());
        System.out.println("Authorities: " + SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        return drugDao.saveDrug(drug);
    }


    // Admin endpoint: Ban/unban a drug
    //http://localhost:8080/api/admin/drug-items/{id}/ban?banned=true
    @PutMapping("/admin/drug-items/{id}/ban")  
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> banUnbanDrug(@PathVariable Long id, @RequestParam boolean banned) {
        Optional<Drug> drugOpt = drugDao.getDrugById(id);
        if (drugOpt.isPresent()) {
            Drug drug = drugOpt.get();
            drug.setBanned(banned);
            drugDao.saveDrug(drug);
            return ResponseEntity.ok("Drug banned status updated.");
        }
        return ResponseEntity.notFound().build();
    }

    // Admin endpoint: Update drug details (including banned status)
    //http://localhost:8080/api/admin/drug-items/{id}
    @PutMapping("/admin/drug-items/{id}")  // changed from /admin/drugs/{id}
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateDrug(@PathVariable Long id, @RequestBody Drug updatedDrug) {
        Drug drug = drugDao.updateDrug(id, updatedDrug);
        if (drug != null) {
            return ResponseEntity.ok(drug);
        }
        return ResponseEntity.notFound().build();
    }
}