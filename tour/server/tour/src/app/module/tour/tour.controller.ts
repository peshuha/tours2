import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourType } from '@tour/lib-dto-js';
import { Tour, TourDocument } from '../../mongo/tour';

@Controller('tour')
export class TourController {

    constructor(
        private tour: TourService
    ){}

    @Post("syntetic-initialize")
    async intialize(@Body("n") n: number) {
        return this.tour.syntetic_intialize(n)
    }

    @Delete("syntetic-reset")
    async syntetic_reset() {
        return this.tour.syntetic_reset()
    }

    @Get()
    async getAll() {
        return this.tour.getAll()
    }

    @Get(":id")
    async getById(@Param("id") id: string) {
        return this.tour.getById(id)
    }

}
