import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });
  it("should be able to list all availables cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "Carro description",
      daily_rate: 1410,
      brand: "car brand",
      category_id: "as",
      fine_amount: 1001,
      license_plate: "qwe-1212",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "Carro description",
      daily_rate: 1410,
      brand: "car_brand_test",
      category_id: "as",
      fine_amount: 1001,
      license_plate: "qwe-1212",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car_brand_test",
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "Carro description",
      daily_rate: 1410,
      brand: "car_brand_test",
      category_id: "as",
      fine_amount: 1001,
      license_plate: "qwe-1212",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "car32s",
    });

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "Carro description",
      daily_rate: 1410,
      brand: "car_brand_test",
      category_id: "12345",
      fine_amount: 1001,
      license_plate: "qwe-1212",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "123456",
    });

    expect(cars).toEqual([car]);
  });
});
