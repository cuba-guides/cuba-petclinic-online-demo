package com.haulmont.sample.petclinic.service;

public interface VisitTestDataCreationService {

    String NAME = "petclinic_VisitTestDataCreationService";

    void createVisits();

    boolean necessaryToCreateVisitTestData();
}