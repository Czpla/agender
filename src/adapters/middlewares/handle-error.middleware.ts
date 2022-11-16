import { HttpResponse, internalServerError } from "../http";
import { IMiddleware } from "./middleware";

export class HandleErrorMiddleware implements IMiddleware {
    constructor(private readonly error: Error) {}

    public handle(): HttpResponse {
        return internalServerError(this.error);
    }
}