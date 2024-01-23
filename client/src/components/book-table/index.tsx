import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Book } from '../../schemas/book.ts';
import { DeleteDialog } from '../dialogs/delete-dialog';

interface BookTableProps {
    books?: Book[];
    deleteBook: (id: string) => void;
    updateBook: (book: Book) => void;
}

const BookTable = ({ books, deleteBook, updateBook }: BookTableProps) => {
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
            deleteBook(selectedBook.id);
        }
        handleClose();
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ height: '100%' }}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Genre</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books
                            ? books.map((book) => (
                                  <TableRow key={book.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                      <TableCell component="th" scope="row">
                                          {book.title}
                                      </TableCell>
                                      <TableCell align="right">{book.author}</TableCell>
                                      <TableCell align="right">{book.genre}</TableCell>
                                      <TableCell align="right">{book.description}</TableCell>
                                      <TableCell align="right">
                                          <div className="flex gap-4 justify-end">
                                              <Button variant="outlined" onClick={() => updateBook(book)}>
                                                  Edit
                                              </Button>

                                              <Button
                                                  variant="outlined"
                                                  color="error"
                                                  onClick={() => handleClickOpen(book)}
                                              >
                                                  Delete
                                              </Button>
                                          </div>
                                      </TableCell>
                                  </TableRow>
                              ))
                            : null}
                    </TableBody>
                </Table>
                <div className="w-full text-center mt-4">
                    {!books || books.length === 0 ? <>No entries found</> : null}
                </div>
            </TableContainer>

            {open ? <DeleteDialog handleDelete={handleDelete} handleClose={handleClose} /> : null}
        </>
    );
};

export default BookTable;
