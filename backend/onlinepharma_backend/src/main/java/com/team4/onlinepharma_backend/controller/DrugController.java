package com.team4.onlinepharma_backend.controller;

import com.team4.onlinepharma_backend.dao.DrugDao;
import com.team4.onlinepharma_backend.model.Drug;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
@RestController
@RequestMapping("/api")
public class DrugController {

    @Autowired
    private DrugDao drugDao;

    // Public endpoint: Only non-banned drugs - no change here
    @GetMapping("/drugs")
    public List<Drug> getAllAvailableDrugs() {
        return drugDao.getAllAvailableDrugs();
    }

    // Admin endpoint: Get all drugs (including banned)
    @GetMapping("/admin/drug-items/all")  // changed from /admin/drugs/all
    @PreAuthorize("hasRole('ADMIN')")
    public List<Drug> getAllDrugsForAdmin() {
        return drugDao.getAllDrugs();
    }

    @GetMapping("/drugs/{id}")
    public Optional<Drug> getDrugById(@PathVariable Long id) {
        return drugDao.getDrugById(id);
    }

    // Admin endpoint: Add a new drug
    @PostMapping("/admin/drug-items")  // changed from /admin/drugs
    @PreAuthorize("hasRole('ADMIN')")
    public Drug addDrug(@RequestBody Drug drug) {
        return drugDao.saveDrug(drug);
    }

    // Admin endpoint: Ban/unban a drug
    @PutMapping("/admin/drug-items/{id}/ban")  // changed from /admin/drugs/{id}/ban
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
