import React from 'react';
import { Book } from '../types';
import { List, ListItem, Divider, Typography, Grid, Button } from '@mui/material';

interface Props {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

export const BookList: React.FC<Props> = ({ books, onEdit, onDelete }) => {
  const renderBookDetails = (book: Book) => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="subtitle1">Author: {book.author}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">Genre: {book.genre}</Typography>
        <Typography variant="body2">Description: {book.description}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={() => onEdit(book)}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={() => onDelete(book.id)} style={{ marginLeft: 8 }}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <List>
      {books.map((book, index) => (
        <React.Fragment key={book.id}>
          <ListItem alignItems="flex-start">
            {renderBookDetails(book)}
          </ListItem>
          {index < books.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};
