import { SingInController } from "@/adapters/controllers/auth/sign-in.controller";

export function SignInFactory() {

    return new SingInController();
}