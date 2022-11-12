import { HttpResponse, ok } from "@/adapters/http";
import { IController } from "../controller";

export class PingController implements IController {
    constructor() {}

    public handle(): HttpResponse {
        return ok({ message: "pong" });
    }
}