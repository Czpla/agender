import { Jwt } from "@/shared/json-web-token";
import {
    GenerateCredentialsInputDTO,
    GenerateCredentialsOutputDTO,
} from "../data-transfer-object/generate-credentials.usecase.dto";

export class GenerateCredentialsUseCase {
    public execute(
        input: GenerateCredentialsInputDTO
    ): GenerateCredentialsOutputDTO {
        const payload = {
            uuid: input.uuid,
            email: input.email,
        };

        const token = Jwt.enconde(payload, { expiresIn: "2h" });

        return {
            token: token,
            expiresIn: Date.now() + 60 * 60 * 2,
        };
    }
}
