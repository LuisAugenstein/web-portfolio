export type Maybe<T> = T | undefined;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
export type OptionalExcept<T, K extends keyof T> = Pick<T, K> & Partial<T>;