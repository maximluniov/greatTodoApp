export type priority = 1 | 2 | 3;


export interface TodoItem {
    id?: string;
    title: string;
    priority: priority
    creationDate: string;
    dueDate: string | null;
    status:boolean,
    notes: string;
}
