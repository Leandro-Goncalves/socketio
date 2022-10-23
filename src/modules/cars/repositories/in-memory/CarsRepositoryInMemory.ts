import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    brand,
    category_id,
    fine_amount,
    license_plate,
    id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const cars = new Car();

    Object.assign(cars, {
      name,
      description,
      daily_rate,
      brand,
      category_id,
      fine_amount,
      license_plate,
      id,
      specifications,
    });

    this.cars.push(cars);
    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const all = this.cars.filter((c) => {
      if (
        c.available === true ||
        (brand && c.brand === brand) ||
        (category_id && c.category_id === category_id) ||
        (name && c.name === name)
      ) {
        return true;
      }
      return false;
    });

    return all;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((c) => c.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((c) => c.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
