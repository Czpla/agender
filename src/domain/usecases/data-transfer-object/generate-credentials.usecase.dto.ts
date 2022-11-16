export type GenerateCredentialsInputDTO = {
    id: string;
    email?: string | null;
};
export type GenerateCredentialsOutputDTO = {
    token: string;
    expiresIn: number;
};