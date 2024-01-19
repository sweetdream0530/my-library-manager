import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Book, NewBook } from "../types";
import { Button, TextField, Grid, Container } from "@mui/material";

interface Props {
    book?: Book | null;
    onSubmit: (book: NewBook | Book) => void;
}

const bookValidationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    genre: Yup.string().required("Genre is required"),
    description: Yup.string().required("Description is required"),
});

export const BookForm: React.FC<Props> = ({ book, onSubmit }) => {
    const getInitialValues = (book: Book | null | undefined): NewBook => ({
        title: book?.title || "",
        author: book?.author || "",
        genre: book?.genre || "",
        description: book?.description || "",
    });

    const formik = useFormik<NewBook>({
        initialValues: getInitialValues(book),
        validationSchema: bookValidationSchema,
        onSubmit: (values, { resetForm }) => {
            onSubmit(values);
            resetForm();
        },
    });

    const { values, handleChange, errors, touched } = formik;

    useEffect(() => {
        formik.resetForm({ values: getInitialValues(book) });
    }, [book]);

    const getTextFieldProps = (name: keyof NewBook) => ({
        fullWidth: true,
        id: name,
        name,
        label: name.charAt(0).toUpperCase() + name.slice(1),
        value: values[name],
        onChange: handleChange,
        error: touched[name] && Boolean(errors[name]),
        helperText: touched[name] && errors[name],
    });

    const buttonText = book ? "Update Book" : "Add Book";

    return (
        <Container component="main" maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    {(["title", "author", "genre"] as const).map((field) => (
                        <Grid item xs={12} key={field}>
                            <TextField {...getTextFieldProps(field)} />
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <TextField
                            {...getTextFieldProps("description")}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            {buttonText}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};
