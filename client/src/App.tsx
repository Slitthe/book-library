import { useState } from 'react';
import { CircularProgress, Button, Snackbar, Alert } from '@mui/material';
import { useBooks } from './hooks/useBooks';
import BookFormDialog from './components/dialogs/book-form-dialog';
import BookTable from './components/book-table';
import { Book, BookFormValues } from './schemas/book.ts';

function App() {
    const [open, setOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);

    const [created, setCreated] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [updated, setUpdated] = useState(false);

    const [createdFailure, setCreatedFailure] = useState(false);
    const [deletedFailure, setDeletedFailure] = useState(false);
    const [updatedFailure, setUpdatedFailure] = useState(false);

    const { books, isLoading, isError, isCreating, isDeleting, isUpdating, createBook, updateBook, deleteBook } =
        useBooks({
            onCreate: () => {
                setCreated(true);
            },
            onUpdate: () => {
                setUpdated(true);
            },
            onDelete: () => {
                setDeleted(true);
            },
            onCreateError: () => {
                setCreatedFailure(true);
            },
            onUpdateError: () => {
                setUpdatedFailure(true);
            },
            onDeleteError: () => {
                setDeletedFailure(true);
            },
        });

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

            <Snackbar open={isCreating} message="Creating book..." />
            <Snackbar open={isUpdating} message="Updating..." />
            <Snackbar open={isDeleting} message="Deleting..." />

            <Snackbar open={created} autoHideDuration={6000} onClose={() => setCreated(false)}>
                <Alert onClose={() => setCreated(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Successfully created!
                </Alert>
            </Snackbar>

            <Snackbar open={deleted} autoHideDuration={6000} onClose={() => setDeleted(false)}>
                <Alert onClose={() => setDeleted(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Successfully deleted!
                </Alert>
            </Snackbar>

            <Snackbar open={updated} autoHideDuration={6000} onClose={() => setUpdated(false)}>
                <Alert onClose={() => setUpdated(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Successfully updated!
                </Alert>
            </Snackbar>

            <Snackbar open={createdFailure} autoHideDuration={6000} onClose={() => setCreatedFailure(false)}>
                <Alert
                    onClose={() => setCreatedFailure(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Failed to create book!
                </Alert>
            </Snackbar>

            <Snackbar open={deletedFailure} autoHideDuration={6000} onClose={() => setDeletedFailure(false)}>
                <Alert
                    onClose={() => setDeletedFailure(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Failed to delete book!
                </Alert>
            </Snackbar>

            <Snackbar open={updatedFailure} autoHideDuration={6000} onClose={() => setUpdatedFailure(false)}>
                <Alert
                    onClose={() => setUpdatedFailure(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Failed to update book!
                </Alert>
            </Snackbar>
        </>
    );
}

export default App;
