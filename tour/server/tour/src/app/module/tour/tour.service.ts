import { Delete, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { Tour } from '../../mongo/tour';
import { TourDto, TourType } from '@tour/lib-dto-js';

@Injectable()
export class TourService {
    constructor(
        @InjectModel(Tour.name, 'tour') private md: Model<Tour>
    ) {}

    async getAll() {
        return this.md.find()
    }

    async getById(id: string) {
        return this.md.findById(id)
    }

    async create(tour: TourDto) {
        const md = new this.md(tour);
        console.log('TourService::create.md', md);
        return md.save();    
    }

    async image_add(id: string, img: string) {
        let tour = await this.md.findById(id)
        tour.img.push(img)
        return tour.save()
    }

    async syntetic_intialize(n: number) {

        const names: string[] = [
            "Gavana"
            , "Island++"
            , "Nizino"
            , "Werhnie Vasuki"
        ]
        const descs: string[] = [
            "Прекрасный город"
            , "Чистый воздух"
            , "Бархатное море"
        ]
        const ops: string[] = [
            "TEZ Tour"
            , "BiblioGlobus"
            , "Intourist"
        ]
        const prices: string[] = [
            "1.002 $"
            , "0.0025 Р"
            , "123.564 $"
        ]
        const types: TourType[] = [
            "all"
            , "single"
            , "multi"
        ]

        const pics: string[] = [
            "ocean.jpg"
            , "pic1.jpg"
            , "pic2.jpg"
            , "pic3.jpg"
            , "pic4.jpg"
            , "pic5.jpg"
            , "pic6.jpg"
            , "pic7.jpg"
            , "pic8.jpg"
            , "pic9.jpg"
        ]

        console.log("math", Math.round(Math.random() * names.length))
       
        // Последовательно создаем N туров
        for(let i = 0; i < n; i++) {

            // Генерим фейковый тур
            const tour: Tour = {
                is_syntetic: true,
                name : names[Math.round(Math.random() * names.length)] || names[Math.round(Math.random() * names.length)],
                description : descs[Math.round(Math.random() * descs.length)] || descs[Math.round(Math.random() * descs.length)],
                tourOperator : ops[Math.round(Math.random() * ops.length)] || ops[Math.round(Math.random() * ops.length)],
                price : prices[Math.round(Math.random() * prices.length)] || prices[Math.round(Math.random() * prices.length)],
                type : types[Math.round(Math.random() * types.length)] || types[Math.round(Math.random() * types.length)],
                img : pics[Math.round(Math.random() * pics.length)] || pics[Math.round(Math.random() * pics.length)]
            }

            console.log("TourService::intialize", tour)
            const md = new this.md(tour)
            await md.save()
         }
    }

    async syntetic_reset() {
        // Удаляем все искусственные туры
        return this.md.deleteMany({is_syntetic: true})
    }
}
