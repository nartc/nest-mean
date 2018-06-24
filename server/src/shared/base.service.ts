import 'automapper-ts/dist/automapper';
import { Document, Model, Types } from 'mongoose';
import { Typegoose, ModelType, InstanceType } from 'typegoose';

export abstract class BaseService<T extends Typegoose> {
    protected _model: ModelType<T>;
    protected _mapper: AutoMapperJs.AutoMapper;

    private get modelName(): string {
        return this._model.modelName;
    }

    private get viewModelName(): string {
        return `${this._model.modelName}Vm`;
    }

    async map<K>(
        object: Partial<InstanceType<T>> | Partial<InstanceType<T>>[],
        isArray: boolean = false,
        sourceKey?: string,
        destinationKey?: string,
    ): Promise<K> {
        const _sourceKey = isArray ? `${sourceKey || this.modelName}[]` : sourceKey || this.modelName;
        const _destinationKey = isArray
            ? `${destinationKey || this.viewModelName}[]`
            : destinationKey || this.viewModelName;
        return this._mapper.map(_sourceKey, _destinationKey, object);
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

    async clearCollection(filter = {}): Promise<void> {
        return this._model.deleteMany(filter).exec();
    }

    private toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }
}
