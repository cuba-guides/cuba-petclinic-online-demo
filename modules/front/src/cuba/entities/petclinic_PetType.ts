import { NamedEntity } from "./NamedEntity";
export class PetType extends NamedEntity {
  static NAME = "petclinic_PetType";
  color?: string | null;
}
export type PetTypeViewName = "_base" | "_local" | "_minimal";
export type PetTypeView<V extends PetTypeViewName> = V extends "_base"
  ? Pick<PetType, "id" | "name" | "color">
  : V extends "_local"
  ? Pick<PetType, "id" | "color" | "name">
  : V extends "_minimal"
  ? Pick<PetType, "id" | "name">
  : never;
