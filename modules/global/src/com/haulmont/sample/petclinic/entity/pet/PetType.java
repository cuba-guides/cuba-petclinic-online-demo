package com.haulmont.sample.petclinic.entity.pet;

import com.haulmont.sample.petclinic.entity.NamedEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Table(name = "PETCLINIC_PET_TYPE")
@Entity(name = "petclinic_PetType")
public class PetType extends NamedEntity {
    private static final long serialVersionUID = -2633909809493220411L;

    @NotNull
    @Column(name = "COLOR", nullable = false, length = 6)
    protected String color;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}