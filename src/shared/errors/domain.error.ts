export interface IDomainErrorProperty {
    value: unknown;
    property: string;
    errors: Record<string, string> | IDomainErrorProperty[];
}

export interface IDomainError {
    message: string;
    errors?: IDomainErrorProperty[];
}