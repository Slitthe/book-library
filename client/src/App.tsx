import { useState } from 'react';
import { CircularProgress, Button } from '@mui/material';
import { useBooks } from './hooks/useBooks';
import BookFormDialog, { BookFormValues } from './components/book-form-dialog';
import BookTable, { Book } from './components/book-table';

function App() {
    const { books, isLoading, createBook, updateBook, deleteBook } = useBooks();
    const [open, setOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);

    const handleOpenCreate = () => {
        setCurrentBook(null);
        setOpen(true);
    };

    const handleOpenUpdate = (book: Book) => {
        setCurrentBook(book);
        setOpen(true);
    };

    const handleSubmit = (values: BookFormValues) => {
        if (currentBook) {
            updateBook(currentBook.id, values);
        } else {
            createBook(values);
        }
        setOpen(false);
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <>
            <BookTable books={books} deleteBook={deleteBook} updateBook={handleOpenUpdate} />
            <Button variant="contained" onClick={handleOpenCreate}>
                Create Book
            </Button>
            {/* Conditionally rendered in order to properly reset the form state */}
            {open ? (
                <BookFormDialog
                    open={true}
                    onClose={() => setOpen(false)}
                    onSubmit={handleSubmit}
                    isUpdate={!!currentBook}
                    initialValues={{
                        title: currentBook?.title ?? '',
                        author: currentBook?.author ?? '',
                        genre: currentBook?.genre ?? '',
                        description: currentBook?.description ?? '',
                    }}
                />
            ) : null}
        </>
    );
}

export default App;
