import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { JwtAuthGurad } from 'src/guards/jwt-auth.guard';


@Controller('resources')
export class ResourcesController {
    constructor(private readonly resourcesService: ResourcesService) {}
    @UseGuards(JwtAuthGurad)

    @Post('add') create(@Body() createResourceDto: CreateResourceDto) {
        return this.resourcesService.create(createResourceDto)
    }
    
    @Get()
    findAll() {
        return this.resourcesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.resourcesService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<CreateResourceDto>) {
        return this.resourcesService.update(id, updateData)
    }

    // Удалить (мягко)
    @Delete(':id')
     remove(@Param('id') id: string) {
        return this.resourcesService.remove(id);
    }


}
