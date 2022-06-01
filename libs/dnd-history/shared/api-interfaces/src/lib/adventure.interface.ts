export interface Adventure extends AdventureDTO {
    id: number;
    lastChangedAt: Date;
}

export interface AdventureDTO {
    title: string;
    content: string;
}