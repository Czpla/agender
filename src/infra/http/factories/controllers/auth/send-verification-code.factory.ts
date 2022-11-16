import { PingController } from "@/adapters/controllers/auth/auth.controller";

export function sendVerificationCodeFactory() {
    const authGateway = new FirebaseAuthRepository();
    const emailService = new NodeMailerMailService();

    const generateToptUseCase = new GenerateToptUseCase(authGateway);
    const sendOptByEmailUseCase = new SendOptByEmailUseCase(emailService);
    const createIfNotExistsAuthUseCase = new CreateIfNotExistsAuthUseCase(
        authGateway
    );

    return new SendVerificationCodeController(
        generateToptUseCase,
        sendOptByEmailUseCase,
        createIfNotExistsAuthUseCase,
    );
}