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
    private DrugRepository drugRepository;

    public Drug saveDrug(Drug drug) {
        return drugRepository.save(drug);
    }

    public Optional<Drug> getDrugById(Long id) {
        return drugRepository.findById(id);
    }

    public List<Drug> getAllDrugs() {
        return drugRepository.findAll();
    }

    public List<Drug> getAllAvailableDrugs() {
        return drugRepository.findByBannedFalse();
    }

    public void deleteDrug(Long id) {
        drugRepository.deleteById(id);
    }

    public Drug updateDrug(Long id, Drug updatedDrug) {
        Optional<Drug> existingDrugOpt = drugRepository.findById(id);
        if (existingDrugOpt.isPresent()) {
            Drug existingDrug = existingDrugOpt.get();
            if (updatedDrug.getName() != null && !updatedDrug.getName().trim().isEmpty()) {
                existingDrug.setName(updatedDrug.getName());
            }
            if (updatedDrug.getDescription() != null && !updatedDrug.getDescription().trim().isEmpty()) {
                existingDrug.setDescription(updatedDrug.getDescription());
            }
            existingDrug.setPrice(updatedDrug.getPrice());
            existingDrug.setQuantity(updatedDrug.getQuantity());
            if (updatedDrug.getCompany() != null && !updatedDrug.getCompany().trim().isEmpty()) {
                existingDrug.setCompany(updatedDrug.getCompany());
            }
            if (updatedDrug.getType() != null && !updatedDrug.getType().trim().isEmpty()) {
                existingDrug.setType(updatedDrug.getType());
            }
            existingDrug.setBanned(updatedDrug.isBanned());
            
            if (updatedDrug.getRating() != null) {
                existingDrug.setRating(updatedDrug.getRating());
            }
            return drugRepository.save(existingDrug);
        }
        return null;
    }
}