import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("shound not be able to add a new specification to a nox-existent car", async () => {
    const car_id = "1234";
    const spefications_id = ["54321"];

    await expect(
      createCarSpecificationUseCase.execute({ car_id, spefications_id })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });

  it("shound be able to add a new specification to the car", async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Carro de luxo",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "VW",
      category_id: "5f3f8f8f-c9c1-4b3f-b8f8-f8f8f8f8f8f8",
    });

    const specification = await specificationRepositoryInMemory.create({
      description: "test",
      name: "test",
    });

    const spefications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id,
      spefications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
