import { useState } from 'react';
import { CircularProgress, Button } from '@mui/material';
import { useBooks } from './hooks/useBooks';
import BookFormDialog from './components/dialogs/book-form-dialog';
import BookTable from './components/book-table';
import { Book, BookFormValues } from './schemas/book.ts';

function App() {
    const { books, isLoading, isError, createBook, updateBook, deleteBook } = useBooks();
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
        console.log({ values });
        if (currentBook) {
            updateBook(currentBook.id, values);
        } else {
            createBook(values);
        }
        setOpen(false);
    };

    return (
        <>
            {!isLoading ? (
                <Button variant="contained" onClick={handleOpenCreate}>
                    Create Book
                </Button>
            ) : null}

            <div className="w-[600px] h-[400px]">
                {isLoading ? (
                    <div className="flex flex-col items-center align-center gap-4">
                        <div>Loading books</div>
                        <CircularProgress />
                    </div>
                ) : null}
                {books && !isError ? (
                    <BookTable books={books} deleteBook={deleteBook} updateBook={handleOpenUpdate} />
                ) : null}
            </div>

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
