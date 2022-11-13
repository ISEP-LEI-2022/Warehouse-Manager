import Entity from "../Entity";

/*
* Interface to differentiate between aggregate root and other entities
*/
export default interface AggregateRoot<T> extends Entity<T> {}