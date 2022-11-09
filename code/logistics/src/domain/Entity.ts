import EntityIdentifier from "./value-objects/interfaces/EntityIdentifier";

/**
 * Interface for basic methods of an entity
 */
export default interface entity<T> {
  identifier: EntityIdentifier<T>;

  /**
   * Validates if the classes have the same id
   * @param ent2 entity to be compared
   */
  sameAs(ent2: Entity<T>): boolean;
}
