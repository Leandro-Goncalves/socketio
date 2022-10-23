import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    const carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f3f8f8f-c9c1-4b3f-b8f8-f8f8f8f8f8f8",
    });

    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f3f8f8f-c9c1-4b3f-b8f8-f8f8f8f8f8f8",
    });

    await expect(
      createCarUseCase.execute({
        name: "Fusca",
        description: "Carro de luxo",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "VW",
        category_id: "5f3f8f8f-c9c1-4b3f-b8f8-f8f8f8f8f8f8",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });
  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f3f8f8f-c9c1-4b3f-b8f8-f8f8f8f8f8f8",
    });

    expect(car.available).toBe(true);
  });
});
