import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    description: string;
}

const BookTable: React.FC<{ books: Book[] }> = ({ books }) => {
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const handleClickOpen = (book: Book) => {
        setSelectedBook(book);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBook(null);
    };

    const handleDelete = () => {
        if (selectedBook) {
            console.log('Delete Book with id:', selectedBook.id);
        }
        handleClose();
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Genre</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {book.title}
                                </TableCell>
                                <TableCell align="right">{book.author}</TableCell>
                                <TableCell align="right">{book.genre}</TableCell>
                                <TableCell align="right">{book.description}</TableCell>
                                <TableCell align="right">
                                    <Button color="primary">Edit</Button>
                                    <Button color="secondary" onClick={() => handleClickOpen(book)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this book?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BookTable;
