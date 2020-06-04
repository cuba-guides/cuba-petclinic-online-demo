import { Person } from "./Person";
import { Specialty } from "./petclinic_Specialty";
export class Veterinarian extends Person {
  static NAME = "petclinic_Veterinarian";
  specialties?: Specialty[] | null;
}
export type VeterinarianViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "veterinarian-with-specialties";
export type VeterinarianView<V extends VeterinarianViewName> = V extends "_base"
  ? Pick<Veterinarian, "id" | "firstName" | "lastName">
  : V extends "_local"
  ? Pick<Veterinarian, "id" | "firstName" | "lastName">
  : V extends "_minimal"
  ? Pick<Veterinarian, "id" | "firstName" | "lastName">
  : V extends "veterinarian-with-specialties"
  ? Pick<Veterinarian, "id" | "firstName" | "lastName" | "specialties">
  : never;
