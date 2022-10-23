import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAreadyExists = await this.categoryRepository.findByName(name);

    if (categoryAreadyExists) {
      throw new AppError("Category already exists");
    }

    this.categoryRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
