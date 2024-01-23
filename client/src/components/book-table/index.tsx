import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
} from '@mui/material';
import { Book } from '@/schemas/book.ts';
import { DeleteDialog } from '@/components/dialogs/delete-dialog';

interface BookTableProps {
    books?: Book[];
    deleteBook: (id: string) => void;
    updateBook: (book: Book) => void;
}

const BookTable = ({ books, deleteBook, updateBook }: BookTableProps) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const handleClickOpen = (book: Book) => {
        setSelectedBook(book);
        setDeleteModalOpen(true);
    };

    const handleClose = () => {
        setDeleteModalOpen(false);
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
                <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell className="!bg-gray-200 !font-bold">Title</TableCell>
                            <TableCell className="!bg-gray-200 !font-bold">Author</TableCell>
                            <TableCell className="!bg-gray-200 !font-bold">Genre</TableCell>
                            <TableCell className="!bg-gray-200 !font-bold">Description</TableCell>
                            <TableCell className="!bg-gray-200 !font-bold"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books
                            ? books.map((book) => (
                                  <TableRow key={book.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                      <TableCell component="th" scope="row">
                                          {book.title}
                                      </TableCell>
                                      <TableCell>{book.author}</TableCell>
                                      <TableCell>{book.genre}</TableCell>
                                      <TableCell>{book.description}</TableCell>
                                      <TableCell>
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
                    {!books || books.length === 0 ? <Typography variant="body1">No entries found</Typography> : null}
                </div>
            </TableContainer>

            {deleteModalOpen ? <DeleteDialog handleDelete={handleDelete} handleClose={handleClose} /> : null}
        </>
    );
};

export default BookTable;
