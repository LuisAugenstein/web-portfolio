export interface Adventure {
    id: number;
    title: string;
    content: string;
    lastChangedAt: Date;
}

export interface AdventureDTO {
    title: string;
    content: string;
}