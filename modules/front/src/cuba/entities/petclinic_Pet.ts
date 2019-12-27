import { NamedEntity } from "./NamedEntity";
import { PetType } from "./petclinic_PetType";
import { Generation } from "../enums/enums";
import { Owner } from "./petclinic_Owner";
export class Pet extends NamedEntity {
    static NAME = "petclinic_Pet";
    identificationNumber?: string | null;
    birthDate?: any | null;
    type?: PetType | null;
    generation?: Generation | null;
    owner?: Owner | null;
}
export type PetViewName = "_minimal" | "_local" | "_base" | "pet-with-owner-and-type" | "pet-with-type";
export type PetView<V extends PetViewName> = V extends "_minimal" ? Pick<Pet, "id" | "identificationNumber" | "name"> : V extends "_local" ? Pick<Pet, "id" | "identificationNumber" | "birthDate" | "generation" | "name"> : V extends "_base" ? Pick<Pet, "id" | "identificationNumber" | "name" | "birthDate" | "generation"> : V extends "pet-with-owner-and-type" ? Pick<Pet, "id" | "identificationNumber" | "birthDate" | "generation" | "name" | "type" | "owner"> : V extends "pet-with-type" ? Pick<Pet, "id" | "identificationNumber" | "birthDate" | "generation" | "name" | "type"> : never;
