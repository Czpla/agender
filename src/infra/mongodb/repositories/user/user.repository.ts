import { User } from "@/domain/entities/user/user.entity";
import { IUserRepository } from "@/domain/repositories/user/user.repository";
import { Either, failed, right } from "@/shared/either";
import { IDomainError } from "@/shared/errors/domain.error";

export class MongodbUserRepository implements IUserRepository {
    public async create(user: User): Promise<void> {
        throw new Error(`Method not ${user} implemented.`);
    }

    public async findByEmail(email: string): Promise<Either<IDomainError, User>> {
        const userOrError = User.create({
            uuid: "995544887545",
            email,
            password: "12345678",
            name: "John Doe",
        });

        if (userOrError.isFailed()) {
            return failed(userOrError.value);
        }

        return right(userOrError.value);
    }

    public async update(user: User): Promise<void> {
        throw new Error(`Method not ${user} implemented.`);
    }
}