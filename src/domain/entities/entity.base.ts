export abstract class EntityBase<T> {
    protected _props: T;
    public get props(): Readonly<T> {
        return this._props as Readonly<T>;
    }

    protected constructor(props: T) {
        this._props = props;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract toJson(): any;
}