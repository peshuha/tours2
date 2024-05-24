import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { Express } from 'express'
import { Multer, diskStorage } from 'multer';
import { TourService } from './tour.service';
import { ITour, TourDto, TourType } from '@tour/lib-dto-js';
import { Tour, TourDocument } from '../../mongo/tour';
import { ConfigService } from '../../config/config.service';
import { v4 as uuidv4 } from 'uuid'

@Controller('tour')
export class TourController {

    constructor(
        private tour: TourService
    ){}

    @Get()
    async getAll() {
        return this.tour.getAll()
    }

    @Get(":id")
    async getById(@Param("id") id: string) {
        return this.tour.getById(id)
    }

    @Post("syntetic-initialize")
    async intialize(@Body("n") n: number) {
        return this.tour.syntetic_intialize(n)
    }

    @Delete("syntetic-reset")
    async syntetic_reset() {
        return this.tour.syntetic_reset()
    }

    @Post("create")
    async create(@Body("tour") tour: ITour) {
        return this.tour.create(new TourDto(tour.name, tour.description, tour.tourOperator, tour.price, tour.type))
    }

    @Post("img-add")
    @UseInterceptors(FileInterceptor('img', {
        storage: diskStorage({
            destination: ConfigService.Config().public_img.multer_path,
            filename: (
                req: Express.Request,
                file: Express.Multer.File,
                callback: (error: Error | null, filename: string) => void,
            ) => {
                const ext = file.mimetype.split("/")[1]
                const name = file.filename + "-" + uuidv4() + "." + ext
            }
        })
    }))
    async img_add(@Body("id") id: string, @UploadedFile() file: Express.Multer.File) {
        console.log("TourController::img_link", file.path)
        return this.tour.image_add(id, file.filename)
    }


}
