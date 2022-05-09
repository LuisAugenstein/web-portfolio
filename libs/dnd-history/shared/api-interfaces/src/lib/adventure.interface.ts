export interface Adventure {
    id: number;
    title: string;
    text: string;
    lastChangedAt: Date;
}

export interface AdventureDTO {
    title: string;
    text: string;
}