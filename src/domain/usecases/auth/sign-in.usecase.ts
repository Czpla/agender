import { User } from "@/domain/entities/user/user.entity";
import { IUserRepository } from "@/domain/repositories/user/user.repository";
import { Either, failed, right } from "@/shared/either";
import { IDomainError } from "@/shared/errors/domain.error";
import { FailedAuthenticate } from "@/shared/errors/user.error";
import { SignInInputDTO } from "../data-transfer-object/sign-in.usecase.dto";

export class SignInUseCase {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    public async execute(data: SignInInputDTO): Promise<Either<IDomainError, User>> {
        const userOrError = User.create(data);

        if (userOrError.isFailed()) {
            return failed(userOrError.value);
        }

        const findUserOrError = await this.userRepository.findByEmail(userOrError.value.props.email.value);

        if (findUserOrError.isFailed()) {
            return failed(findUserOrError.value);
        }

        const user = findUserOrError.value;

        const passwordMatch = await user.comparePassword(data.password);

        if (!passwordMatch) {
            return failed(new FailedAuthenticate());
        }

        return right(user);
    }
}