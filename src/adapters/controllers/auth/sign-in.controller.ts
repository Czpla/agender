import { HttpBody, HttpResponse, ok } from "@/adapters/http";
import { IController } from "../controller";
import { SingInBodyDTO } from "../data-tranfer-object/sign-in.controller.dto";

export class SingInController implements IController {
    constructor(

    ) {}
    
    public async handle(request: HttpBody<SingInBodyDTO>): Promise<HttpResponse> {
        const body = request.body;
        
        return ok({ message: body.email });
    }
}