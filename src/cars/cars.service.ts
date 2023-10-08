import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    { id: uuid(), brand: 'Fiat', model: 'Argo' },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id "${id}" not fond`);

    return car;
  }
  createCar(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      /*  brand: createCarDto.brand,
      model: createCarDto.model, */
      ...createCarDto,
    };
    this.cars.push(car);
    return car;
  }
  updateCar(id: string, updateCardDto: UpdateCarDto) {
    let carDB = this.findOneById(id);
    if (updateCardDto.id && updateCardDto.id !== id)
      throw new BadRequestException(`Car id is not valid inside body`);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCardDto,
          id,
        };
        return carDB;
      }
    });
    return carDB;
  }

  deleteCar(id: string) {
    const car = this.findOneById(id);

    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
