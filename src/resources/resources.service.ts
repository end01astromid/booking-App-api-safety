import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResourceDocument, Resource } from './resource.schema';
import { Model } from 'mongoose';
import { CreateResourceDto } from './dto/create-resource.dto';

@Injectable()
export class ResourcesService {
    constructor(@InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>) {}
        async create(CreateResourceDto: CreateResourceDto ): Promise <Resource> {
            const newResorse = new this.resourceModel(CreateResourceDto)
            return newResorse.save()
        }

        async findAll(): Promise<Resource[]> {
            return this.resourceModel.find({isActive: true}).exec()
    }
        async findOne(id: string): Promise <Resource> {
            const resource = await this.resourceModel.findById(id).exec()
            if(!resource) {
                throw new NotFoundException(`resource with id ${id} not found`);
            }
            return resource
        }

        async update(id: string, updateData: Partial <CreateResourceDto>): Promise <Resource> {
            const resource = await this.resourceModel.findByIdAndUpdate(
                id,
                updateData,
                {new: true}
            ).exec()

            if(!resource){
                throw new NotFoundException(`resource with id ${id} not found`);
            }
            return resource
        }
                //(мягкое удаление)
        async remove (id: string): Promise<void> {
            const resource = await this.resourceModel.findByIdAndUpdate(
                id,
                {isActive: false},
                {new: true}
            ).exec();

            if(resource) {
                throw new NotFoundException(`resource with id ${id} not found`);
            }
        }
}

