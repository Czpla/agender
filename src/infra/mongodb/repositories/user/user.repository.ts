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
            uuid: "556468e8-7143-4afb-a6d7-d2ab4e2d381b",
            email,
            password: "25d55ad283aa400af464c76d713c07ad",
            name: "Eduardo Czpla",
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