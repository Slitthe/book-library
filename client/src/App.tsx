import { useState } from 'react';
import { CircularProgress, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useBooks } from '@/hooks/useBooks.ts';
import { Book, BookFormValues } from '@/schemas/book.ts';
import BookTable from '@/components/book-table';
import BookFormDialog from '@/components/dialogs/book-form-dialog';
import { BooksNotifications } from '@/components/books-notifications';

function App() {
    const [open, setOpen] = useState(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);

    const { books, isLoading, isError, createBook, updateBook, deleteBook } = useBooks();

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
        <div className="h-full flex items-center justify-center">
            <div className="w-full px-6 h-[80vh]">
                {!isLoading ? (
                    <Button variant="contained" onClick={handleOpenCreate}>
                        Create Book <AddIcon />
                    </Button>
                ) : null}
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
            <BooksNotifications />
        </div>
    );
}

export default App;
