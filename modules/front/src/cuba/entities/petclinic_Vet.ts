import { Person } from "./Person";
import { Specialty } from "./petclinic_Specialty";
export class Vet extends Person {
    static NAME = "petclinic_Vet";
    specialties?: Specialty[] | null;
}
export type VetViewName = "_minimal" | "_local" | "_base" | "vet-with-specialties";
export type VetView<V extends VetViewName> = V extends "_minimal" ? Pick<Vet, "id" | "firstName" | "lastName"> : V extends "_local" ? Pick<Vet, "id" | "firstName" | "lastName"> : V extends "_base" ? Pick<Vet, "id" | "firstName" | "lastName"> : V extends "vet-with-specialties" ? Pick<Vet, "id" | "firstName" | "lastName" | "specialties"> : never;
