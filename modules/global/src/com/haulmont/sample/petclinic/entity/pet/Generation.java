package com.haulmont.sample.petclinic.entity.pet;

import com.haulmont.chile.core.datatypes.impl.EnumClass;

import javax.annotation.Nullable;


public enum Generation implements EnumClass<Integer> {

    KANTO(10),
    JOHTO(20),
    HOENN(30),
    SINNOH(40),
    UNOVA(50),
    KALOS(60),
    ALOLA(70);

    private Integer id;

    Generation(Integer value) {
        this.id = value;
    }

    public Integer getId() {
        return id;
    }

    @Nullable
    public static Generation fromId(Integer id) {
        for (Generation at : Generation.values()) {
            if (at.getId().equals(id)) {
                return at;
            }
        }
        return null;
    }
}