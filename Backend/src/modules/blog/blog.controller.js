import * as blogService from "./blog.service.js";
import { Router } from "express";

const router = Router();

router.post("/" , blogService.createBlog);
router.get("/" , blogService.listBlogs);

export default router;