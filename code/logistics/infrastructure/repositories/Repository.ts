import mongoose, { Mongoose } from "mongoose";
import Entity from "../../domain/Entity";
/**
 * Interface defines basic methods for all repositories.
 */
export default interface repository<T> {
  persists(entity: Entity<T>): Promise<mongoose.Document> | never;
  exists(identifier: string): Promise<boolean>;
}
