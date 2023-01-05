import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res) => {
  return res.json({ok:true})
});

export { userRoutes };
