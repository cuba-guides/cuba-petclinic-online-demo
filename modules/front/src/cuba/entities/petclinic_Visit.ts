import { StandardEntity } from "./base/sys$StandardEntity";
import { VisitType, VisitTreatmentStatus } from "../enums/enums";
import { User } from "./base/sec$User";
import { Pet } from "./petclinic_Pet";
export class Visit extends StandardEntity {
  static NAME = "petclinic_Visit";
  type?: VisitType | null;
  assignedNurse?: User | null;
  pet?: Pet | null;
  visitStart?: any | null;
  visitEnd?: any | null;
  description?: string | null;
  treatmentStatus?: VisitTreatmentStatus | null;
  petName?: string | null;
  typeStyle?: string | null;
}
export type VisitViewName = "_base" | "_local" | "_minimal" | "visit-with-pet";
export type VisitView<V extends VisitViewName> = V extends "_base"
  ? Pick<
      Visit,
      | "id"
      | "pet"
      | "type"
      | "visitStart"
      | "visitEnd"
      | "description"
      | "treatmentStatus"
    >
  : V extends "_local"
  ? Pick<
      Visit,
      | "id"
      | "type"
      | "visitStart"
      | "visitEnd"
      | "description"
      | "treatmentStatus"
    >
  : V extends "_minimal"
  ? Pick<Visit, "id" | "pet">
  : V extends "visit-with-pet"
  ? Pick<
      Visit,
      | "id"
      | "type"
      | "visitStart"
      | "visitEnd"
      | "description"
      | "treatmentStatus"
      | "pet"
      | "assignedNurse"
    >
  : never;
