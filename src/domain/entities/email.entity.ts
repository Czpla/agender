import { Either, failed, right } from "@/shared/either";
import { InvalidNonNullable } from "@/shared/errors/common.error";
import { IDomainError } from "@/shared/errors/domain.error";
import { InvalidFormatEmail } from "@/shared/errors/email.error";
import { EntityBase } from "./entity.base";

export type EmailProps = {
    value: string;
}

export class Email extends EntityBase<EmailProps> {
    constructor(props: EmailProps) {
        super(props);
    }

    public get value() {
        return this.props.value;
    }

    public toJson() {
        return {
            value: this.props.value,
        };
    }

    public static create(email: string): Either<IDomainError, Email> {
        const tester =
            /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        if (!email) {
            return failed(new InvalidNonNullable("email"));
        }

        if (!tester.test(email)) {
            return failed(new InvalidFormatEmail(email));
        }

        const props: EmailProps = {
            value: email,
        };

        return right(new Email(props));
    }
}