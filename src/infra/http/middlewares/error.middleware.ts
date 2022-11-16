import { adapterExpress } from "../express.adapter";
import { Application, ErrorRequestHandler } from "express";
import { handleErrorFactory } from "../factories/middlewares/handle-error.factory";
import { notFoundFactory } from "../factories/controllers/not-found.factory";

export function errorMiddlewares(app: Application) {
    const func: ErrorRequestHandler = (error, req, res, next) =>
        adapterExpress(handleErrorFactory(error))(req, res, next);

    app.use(func);
    app.use("*", adapterExpress(notFoundFactory()));
}