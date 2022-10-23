import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const images = req.files as IFiles[];
    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({
      car_id,
      images_name,
    });

    return res.status(201).send();
  }
}

export { UploadCarImageController };
