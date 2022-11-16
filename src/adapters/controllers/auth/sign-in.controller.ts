import { badRequest, HttpBody, HttpResponse, ok } from "@/adapters/http";
import { GenerateCredentialsUseCase } from "@/domain/usecases/auth/generate-credentials.usecase";
import { SignInUseCase } from "@/domain/usecases/auth/sign-in.usecase";
import { IController } from "../controller";
import { SingInBodyDTO } from "../data-tranfer-object/sign-in.controller.dto";

export class SignInController implements IController {
    constructor(
        private readonly signInUseCase: SignInUseCase,
        private readonly generateCredentialsUseCase: GenerateCredentialsUseCase
    ) {}
    
    public async handle(request: HttpBody<SingInBodyDTO>): Promise<HttpResponse> {
        const body = request.body;

        const userOrErro = await this.signInUseCase.execute({
            email: body.email,
            password: body.password,
        });

        if (userOrErro.isFailed()) {
            return badRequest(userOrErro.value);
        }

        const credentials = await this.generateCredentialsUseCase.execute({
            uuid: userOrErro.value.props.uuid,
            email: userOrErro.value.props.email.props.value,
        });
        
        return ok({ 
            accessToken: credentials.token,
            expiresIn: credentials.expiresIn, 
        });
    }
}