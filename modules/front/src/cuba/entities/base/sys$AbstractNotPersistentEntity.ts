export class AbstractNotPersistentEntity {
  static NAME = "sys$AbstractNotPersistentEntity";
  id?: any | null;
}
export type AbstractNotPersistentEntityViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type AbstractNotPersistentEntityView<
  V extends AbstractNotPersistentEntityViewName
> = never;
