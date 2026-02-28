import { stablishConnection } from "./DB/connection.db.js";
import express from "express";
import cors from "cors";
import authController from "./modules/auth/auth.controller.js";
import userController from "./modules/user/user.controller.js";
import blogController from "./modules/blog/blog.controller.js";
const bootstrap = () => {
    const app = express();
    const PORT = 3000;
    // DB
    stablishConnection();
    // handle Buffer 
    app.use(express.json());
    // CORS
    app.use(cors());
    // Routing
    app.use("/auth" , authController);
    app.use("/user" , userController);
    app.use("/blog" , blogController);
    // Server
    return app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });    
}


export default bootstrap;