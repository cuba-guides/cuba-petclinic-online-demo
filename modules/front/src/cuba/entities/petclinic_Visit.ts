import { StandardEntity } from "./base/sys$StandardEntity";
import { Pet } from "./petclinic_Pet";
export class Visit extends StandardEntity {
    static NAME = "petclinic_Visit";
    visitDate?: any | null;
    description?: string | null;
    pet?: Pet | null;
}
export type VisitViewName = "_minimal" | "_local" | "_base" | "visit-with-pet";
export type VisitView<V extends VisitViewName> = V extends "_minimal" ? Pick<Visit, "id" | "pet" | "visitDate"> : V extends "_local" ? Pick<Visit, "id" | "visitDate" | "description"> : V extends "_base" ? Pick<Visit, "id" | "pet" | "visitDate" | "description"> : V extends "visit-with-pet" ? Pick<Visit, "id" | "visitDate" | "description" | "pet"> : never;
