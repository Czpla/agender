import { SignInController } from "@/adapters/controllers/auth/sign-in.controller";
import { GenerateCredentialsUseCase } from "@/domain/usecases/auth/generate-credentials.usecase";
import { SignInUseCase } from "@/domain/usecases/auth/sign-in.usecase";
import { MongodbUserRepository } from "@/infra/mongodb/repositories/user/user.repository";

export function SignInFactory() {
    const mongodbUserRepository = new MongodbUserRepository();

    const signInUseCase = new SignInUseCase(mongodbUserRepository);
    const generateCredentialsUseCase = new GenerateCredentialsUseCase();

    return new SignInController(
        signInUseCase,
        generateCredentialsUseCase
    );
}