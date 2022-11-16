import { Either, failed, right } from "@/shared/either";
import { InvalidMinLength } from "@/shared/errors/common.error";
import { IDomainError } from "@/shared/errors/domain.error";
import { Email } from "../email.entity";
import { EntityBase } from "../entity.base";
import { UserData } from "./user-data.entity";

export type UserProps = {
    uuid?: string;
    email: Email
    password: string;
    name: string | null;
}

export class User extends EntityBase<UserProps> {

    constructor(props: UserProps) {
        super(props);
    }

    public async comparePassword(password: string): Promise<boolean> {
        return this.props.password === password;
    }

    public toJson() {
        return {
            uuid: this.props.uuid,
            email: this.props.email.toJson(),
            password: this.props.password,
            name: this.props.name,
        };
    }

    public static create(data: UserData): Either<IDomainError, User> {
        const emailOrError = Email.create(data.email);

        if (emailOrError.isFailed()) {
            return failed(emailOrError.value);
        }

        if (data.password.length < 8) {
            return failed(new InvalidMinLength("password", 8));
        }

        const props: UserProps = {
            uuid: data.uuid,
            email: emailOrError.value,
            password: data.password,
            name: data.name,
        };

        return right(new User(props));
    }
}