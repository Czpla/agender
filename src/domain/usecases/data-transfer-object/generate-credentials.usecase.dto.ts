export type GenerateCredentialsInputDTO = {
    uuid?: string;
    email: string;
};

export type GenerateCredentialsOutputDTO = {
    token: string;
    expiresIn: number;
};