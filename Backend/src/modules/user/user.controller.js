import * as userService from "./user.service.js";
import { Router } from "express";

const router = Router();

router.get("/:id/profile" , userService.getProfile);
router.get("/search" , userService.searchUsers);
router.patch("/:id" , userService.updateProfile);
router.delete("/:id" , userService.deleteUser);

export default router;