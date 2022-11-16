import { IController } from "./controller";
import { HttpResponse, notFound } from "../http";

export class NotFoundController implements IController {
    public handle(): HttpResponse {
        return notFound();
    }
}