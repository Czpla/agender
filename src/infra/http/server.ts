import { Application } from "express";
import { errorMiddlewares } from "./middlewares/error.middleware";
import { authRoutes } from "../routes/auth.routes";
import { commonMiddlewares } from "./middlewares/common.middleware";

export class HttpServer {
    constructor(
        public application: Application
    ) {}

    public build() {
        commonMiddlewares(this.application);
        authRoutes(this.application);
        errorMiddlewares(this.application);

        return this;
    }
}