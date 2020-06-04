import { NamedEntity } from "./NamedEntity";
export class Specialty extends NamedEntity {
  static NAME = "petclinic_Specialty";
}
export type SpecialtyViewName = "_base" | "_local" | "_minimal";
export type SpecialtyView<V extends SpecialtyViewName> = V extends "_base"
  ? Pick<Specialty, "id" | "name">
  : V extends "_local"
  ? Pick<Specialty, "id" | "name">
  : V extends "_minimal"
  ? Pick<Specialty, "id" | "name">
  : never;
