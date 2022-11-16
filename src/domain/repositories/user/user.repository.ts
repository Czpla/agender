import { User } from "@/domain/entities/user/user.entity";
import { Either } from "@/shared/either";
import { IDomainError } from "@/shared/errors/domain.error";

export interface IUserRepository {
    create(user: User): Promise<void>;
    findByEmail(email: string): Promise<Either<IDomainError, User>>;
    update(user: User): Promise<void>;
}