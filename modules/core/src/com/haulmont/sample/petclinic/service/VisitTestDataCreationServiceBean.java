package com.haulmont.sample.petclinic.service;

import com.haulmont.sample.petclinic.core.VisitTestDataCreation;
import javax.inject.Inject;
import org.springframework.stereotype.Service;

@Service(VisitTestDataCreationService.NAME)
public class VisitTestDataCreationServiceBean implements VisitTestDataCreationService {

    @Inject
    protected VisitTestDataCreation visitTestDataCreation;

    @Override
    public void createVisits() {
        visitTestDataCreation.createData();
    }
}