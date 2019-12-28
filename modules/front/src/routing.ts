import {PetclinicVisitManagement} from './app/visit/PetclinicVisitManagement';
import {PetclinicVetManagement} from './app/vet/PetclinicVetManagement';
import {PetclinicSpecialtyManagement} from './app/specialty/PetclinicSpecialtyManagement';
import {PetclinicPetManagement} from './app/pet/PetclinicPetManagement';
import {PetclinicOwnerManagement} from './app/owner/PetclinicOwnerManagement';
import {PetclinicPetTypeManagement} from './app/pettype/PetclinicPetTypeManagement';
import {getMenuItems} from "@cuba-platform/react";

export const menuItems = getMenuItems();

const petclinicMenu = {
  caption: 'Petclinic',
  items: [
    {
      pathPattern: PetclinicOwnerManagement.PATH + '/:entityId?',
      menuLink: PetclinicOwnerManagement.PATH,
      component: PetclinicOwnerManagement,
      caption: 'Owners'
    },
    {
      pathPattern: PetclinicPetManagement.PATH + '/:entityId?',
      menuLink: PetclinicPetManagement.PATH,
      component: PetclinicPetManagement,
      caption: 'Pets'
    },
    {
      pathPattern: PetclinicVetManagement.PATH + '/:entityId?',
      menuLink: PetclinicVetManagement.PATH,
      component: PetclinicVetManagement,
      caption: 'Veterinarians'
    },
    {
      pathPattern: PetclinicVisitManagement.PATH + '/:entityId?',
      menuLink: PetclinicVisitManagement.PATH,
      component: PetclinicVisitManagement,
      caption: 'Visits'
    }
  ]
};
menuItems.push(petclinicMenu);

const mastedDataMenu = {
  caption: 'Master Data',
  items: [
    {
      pathPattern: PetclinicPetTypeManagement.PATH + '/:entityId?',
      menuLink: PetclinicPetTypeManagement.PATH,
      component: PetclinicPetTypeManagement,
      caption: 'Pet Types'
    },
    {
      pathPattern: PetclinicSpecialtyManagement.PATH + '/:entityId?',
      menuLink: PetclinicSpecialtyManagement.PATH,
      component: PetclinicSpecialtyManagement,
      caption: 'Specialties'
    }
  ]
};
menuItems.push(mastedDataMenu);
