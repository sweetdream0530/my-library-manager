import axios from "axios";
import { Book, NewBook } from "../types";

const API_URL = "http://localhost:3001/books"; // Adjust the URL as per your mock server

export const getBooks = () =>
    axios
        .get<Book[]>(API_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
export const getBook = (id: string) => axios.get<Book>(`${API_URL}/${id}`);
export const addBook = (book: NewBook) => axios.post<Book>(API_URL, book);
export const updateBook = (id: string, book: NewBook) =>
    axios.put<Book>(`${API_URL}/${id}`, book);
export const deleteBook = (id: string) => axios.delete(`${API_URL}/${id}`);
