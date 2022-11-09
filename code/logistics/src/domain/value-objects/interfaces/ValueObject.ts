/**
 * Interface for value objects
 */

 export default interface ValueObject<T> {
    value(): T;
    equals(o: ValueObject<T>): boolean;
  }
  