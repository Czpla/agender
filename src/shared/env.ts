export class Environment {
    public static get(key: string): string;

    public static get(key: string): string {
        const value = process.env[key];

        if (value === undefined) {
            throw new Error(`key "${key}" not found`);
        }

        return value;
    }

    public static set(key: string, value: string): void {
        process.env[key] = value;
    }

    public static exists(key: string): boolean {
        return process.env[key] !== undefined;
    }
}

export const Env = Environment;