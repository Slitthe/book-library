import { useState } from 'react';
import { CircularProgress, Button } from '@mui/material';
import { useBooks } from './hooks/useBooks';
import BookFormDialog, { BookFormValues } from './components/book-form-dialog';
import BookTable from './components/book-table';

function App() {
    const { books, isLoading, createBook, updateBook, deleteBook } = useBooks();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (values: BookFormValues) => {
        createBook(values);
        handleClose();
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <>
            <BookTable books={books} deleteBook={deleteBook} updateBook={updateBook} />
            <Button variant="contained" onClick={handleOpen}>
                Create Book
            </Button>
            <BookFormDialog open={open} onClose={handleClose} onSubmit={handleSubmit} />
        </>
    );
}

export default App;
