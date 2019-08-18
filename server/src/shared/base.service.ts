import { Types } from 'mongoose';
import { InstanceType, ModelType, Typegoose } from 'typegoose';
import { AutoMapper, Constructable } from 'automapper-nartc';

export abstract class BaseService<T extends Typegoose> {
    protected _model: ModelType<T>;
    protected _mapper: AutoMapper;

    private get modelName(): string {
        return this._model.modelName;
    }

    private get viewModelName(): string {
        return `${this._model.modelName}Vm`;
    }

    async map<T, K>(
        object: Partial<InstanceType<T>>,
        source: Constructable<T>,
        destination: Constructable<K>,
    ): Promise<K> {
        return this._mapper.map<T, K>(object as T, source, destination);
    }

    async mapArray<T, K>(
        object: Array<Partial<InstanceType<T>>>,
        source: Constructable<T>,
        destination: Constructable<K>
    ): Promise<K[]> {
        return this._mapper.mapArray<T, K>(object as T[], source, destination)
    }

    async findAll(filter = {}): Promise<InstanceType<T>[]> {
        return this._model.find(filter).exec();
    }

    async findOne(filter = {}): Promise<InstanceType<T>> {
        return this._model.findOne(filter).exec();
    }

    async findById(id: string): Promise<InstanceType<T>> {
        return this._model.findById(this.toObjectId(id)).exec();
    }

    async create(item: InstanceType<T>): Promise<InstanceType<T>> {
        return this._model.create(item);
    }

    async delete(id: string): Promise<InstanceType<T>> {
        return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
    }

    async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
        return this._model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
    }

    async clearCollection(filter = {}): Promise<{ ok?: number; n?: number; }> {
        return this._model.deleteMany(filter).exec();
    }

    private toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }
}
