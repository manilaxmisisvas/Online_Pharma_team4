package com.team4.onlinepharma_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team4.onlinepharma_backend.dao.DrugDao;
import com.team4.onlinepharma_backend.model.Drug;
import org.springframework.web.bind.annotation.RequestMethod;

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})

@RestController
@RequestMapping("/api")
//http://localhost:8080/api

public class DrugController {

    @Autowired
    private DrugDao drugDao;

    @GetMapping("/drugs")
    public List<Drug> getAllDrugs() {
        return drugDao.getAllDrugs();
    }
    
    @GetMapping("/drugs/{id}")
    public Optional<Drug> getDrugById(@PathVariable Long id) {
        return drugDao.getDrugById(id);
    }

    @PostMapping("/admin/drugs")
    public Drug addDrug(@RequestBody Drug drug) {
        return drugDao.saveDrug(drug);
    }
    
    @DeleteMapping("/admin/drugs/{id}")
    public void deleteDrug(@PathVariable Long id) {
        drugDao.deleteDrug(id);
    }
    
    @PutMapping("/admin/drugs/{id}")
    public Drug updateDrug(@PathVariable Long id, @RequestBody Drug updatedDrug) {
        return drugDao.updateDrug(id, updatedDrug);
    }

   
}
