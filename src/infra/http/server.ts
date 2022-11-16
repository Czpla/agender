import { Application } from "express";
import { errorMiddlewares } from "./middlewares/error.middleware";
import { authRoutes } from "../routes/auth.routes";

export class HttpServer {
    constructor(
        public application: Application
    ) {}

    public build() {
        authRoutes(this.application);
        errorMiddlewares(this.application);

        return this;
    }
}