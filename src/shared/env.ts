export class Environment {
    public static get(key: string): string;
    public static get(key: string, defaultValue?: string): string;
    public static get(key: string, defaultValue?: number): number;
    public static get(key: string, defaultValue?: boolean): boolean;
    public static get(
        key: string,
        defaultValue?: string | number | boolean
    ): string | number | boolean {
        const value = process.env[key];

        if (value === undefined) {
            if (defaultValue !== undefined) {
                return defaultValue;
            }

            throw new Error(`key "${key}" not found.`);
        }

        switch (typeof defaultValue) {
            case "boolean":
                switch (value) {
                    case "1":
                    case "true":
                    case "TRUE":
                    case "True":
                        return true;
                    default:
                        return false;
                }

            case "number":
                return Number(value);
            default:
                return value;
        }
    }

    public static set(key: string, value: string): void {
        process.env[key] = value;
    }

    public static exists(key: string): boolean {
        return process.env[key] !== undefined;
    }
}

export const Env = Environment;