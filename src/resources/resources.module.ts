import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource, ResourceSchema } from './resource.schema'; 
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { 
        name: Resource.name, 
        schema: ResourceSchema
      }
    ]),
    AuthModule
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule {}