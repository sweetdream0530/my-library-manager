export interface NewBook {
    title: string;
    author: string;
    genre: string;
    description: string;
}

export interface Book extends NewBook {
    id: string;
}
