package com.haulmont.sample.petclinic.web.pet.pettype;

import com.haulmont.cuba.gui.UiComponents;
import com.haulmont.cuba.gui.components.Component;
import com.haulmont.cuba.gui.components.CssLayout;
import com.haulmont.cuba.gui.components.HtmlAttributes;
import com.haulmont.cuba.gui.components.Label;
import com.haulmont.cuba.gui.screen.*;
import com.haulmont.sample.petclinic.entity.pet.PetType;

import javax.inject.Inject;

@UiController("petclinic_PetType.browse")
@UiDescriptor("pet-type-browse.xml")
@LookupComponent("petTypesTable")
@LoadDataBeforeShow
public class PetTypeBrowse extends StandardLookup<PetType> {
    @Inject
    private UiComponents uiComponents;
    @Inject
    private HtmlAttributes htmlAttributes;

    @Install(to = "petTypesTable.color", subject = "columnGenerator")
    private Component petTypesTableColorColumnGenerator(PetType petType) {
        String color = petType.getColor();

        Label<String> colorBox = uiComponents.create(Label.TYPE_STRING);
        colorBox.setStyleName("color-box");
        htmlAttributes.applyCss(colorBox, "background-color: #" + color);

        Label<String> value = uiComponents.create(Label.TYPE_STRING);
        value.setValue(color);

        CssLayout layout = uiComponents.create(CssLayout.NAME);
        layout.add(colorBox, value);

        return layout;
    }
}