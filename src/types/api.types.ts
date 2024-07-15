export interface APIError {
    status: number;
    message: string;
}

export interface Device {
    uuid: string;
    brand: string;
    model: string;
}

export interface AuthResponse {
    token: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Book {
    title: string;
    author: string;
    isbn: string;
    cover: string;
}
