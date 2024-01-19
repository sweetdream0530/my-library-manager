import React, { useState, useCallback } from "react";
import useSWR, { mutate } from "swr";
import { Book, NewBook } from "./types";
import { BookForm, BookList } from "./components";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "./services/bookService";
import { Container } from "@mui/material";

const App: React.FC = () => {
  const { data: books = [], error } = useSWR("books", getBooks);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleAddBook = useCallback(async (book: NewBook) => {
    await addBook(book);
    mutate("books");
  }, []);

  const handleUpdateBook = useCallback(
    async (book: NewBook) => {
      if (!selectedBook) {
        console.error("No book selected for update");
        return;
      }
      await updateBook(selectedBook.id, book);
      setSelectedBook(null);
      mutate("books");
    },
    [selectedBook]
  );

  const handleDeleteBook = useCallback(async (bookId: string) => {
    await deleteBook(bookId);
    mutate("books");
  }, []);

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
  };

  if (error) return <div>Error loading books.</div>;
  if (!books) return <div>Loading...</div>;

  return (
    <Container>
      <h1>My Personal Library Manager</h1>
      <BookForm
        book={selectedBook}
        onSubmit={selectedBook ? handleUpdateBook : handleAddBook}
      />
      <BookList
        books={books}
        onEdit={handleEditClick}
        onDelete={handleDeleteBook}
      />
    </Container>
  );
};

export default App;
