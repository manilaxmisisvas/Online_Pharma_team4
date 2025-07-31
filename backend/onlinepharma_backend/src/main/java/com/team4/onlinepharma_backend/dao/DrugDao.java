package com.team4.onlinepharma_backend.dao;

import com.team4.onlinepharma_backend.model.Drug;
import com.team4.onlinepharma_backend.repo.DrugRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DrugDao {

    @Autowired
    private DrugRepository drugRepository;

    // Returns all drugs (admin use, includes banned)
    public List<Drug> getAllDrugs() {
        return drugRepository.findAll();
    }

    // Returns only non-banned drugs (available to users)
    public List<Drug> getAllAvailableDrugs() {
        return drugRepository.findByBannedFalse();
    }

    public Optional<Drug> getDrugById(Long id) {
        return drugRepository.findById(id);
    }

    public Drug saveDrug(Drug drug) {
        return drugRepository.save(drug);
    }

    public void deleteDrug(Long id) {
        drugRepository.deleteById(id);
    }

    public Drug updateDrug(Long id, Drug updatedDrug) {
        Optional<Drug> drugOpt = drugRepository.findById(id);
        if (drugOpt.isPresent()) {
            Drug drug = drugOpt.get();
            drug.setName(updatedDrug.getName());
            drug.setDescription(updatedDrug.getDescription());
            drug.setPrice(updatedDrug.getPrice());
            drug.setQuantity(updatedDrug.getQuantity());
            drug.setBanned(updatedDrug.isBanned());  // Update banned field too
            return drugRepository.save(drug);
        }
        return null;
    }
}
