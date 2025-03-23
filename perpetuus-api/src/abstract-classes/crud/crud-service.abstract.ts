import { types } from '@typegoose/typegoose';
import { Model } from 'mongoose';

export abstract class CRUD_Service<Model, Schema> {
    public model = <Model>Model;

    abstract create(...args: any[]): Promise<types.DocumentType<Schema>>;
    abstract read(...args: any[]): Promise<types.DocumentType<Schema>[]>;
    abstract read_by_sequence(...args: any[]): Promise<types.DocumentType<Schema> | Schema | null>;
    abstract update(...args: any[]): Promise<types.DocumentType<Schema> | Schema | null>;
    abstract activate(...args: any[]): Promise<types.DocumentType<Schema> | Schema | null>;
    abstract deactivate(...args: any[]): Promise<types.DocumentType<Schema> | Schema | null>;
}
