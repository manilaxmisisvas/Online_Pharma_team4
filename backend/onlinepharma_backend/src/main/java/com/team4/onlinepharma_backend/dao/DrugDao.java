package com.team4.onlinepharma_backend.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.team4.onlinepharma_backend.model.Drug;
import com.team4.onlinepharma_backend.repo.DrugRepository;

@Repository
public class DrugDao {

    @Autowired
    private DrugRepository drugRepo;

    public List<Drug> getAllDrugs() {
        return drugRepo.findAll();
    }

    public Drug saveDrug(Drug drug) {
        return drugRepo.save(drug);
    }

    public Optional<Drug> getDrugById(Long id) {
        return drugRepo.findById(id);
    }
    
    
    public void deleteDrug(Long id) {
        drugRepo.deleteById(id);
    }

    public Drug updateDrug(Long id, Drug updatedDrug) {
        return drugRepo.findById(id).map(existingDrug -> {
            existingDrug.setName(updatedDrug.getName());
            existingDrug.setCompany(updatedDrug.getCompany());
            existingDrug.setType(updatedDrug.getType());
            existingDrug.setPrice(updatedDrug.getPrice());
            existingDrug.setQuantity(updatedDrug.getQuantity());
            existingDrug.setRating(updatedDrug.getRating());
            existingDrug.setBanned(updatedDrug.isBanned());
            return drugRepo.save(existingDrug);
        }).orElseThrow(() -> new RuntimeException("Drug not found with id " + id));
    }

    
   
   
}
