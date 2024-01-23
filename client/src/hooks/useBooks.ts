import useSWR, { mutate } from 'swr';
import axiosInstance from '../api';
import { BooksSchema, BookFormValues } from '../schemas/book.ts';

const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    const data = await response.data;

    try {
        return BooksSchema.validateSync(data);
    } catch (e) {
        throw new Error('Failed to get data');
    }
};

export const useBooks = () => {
    const { data, error, isLoading } = useSWR('/books', fetcher);

    const createBook = async (bookData: BookFormValues) => {
        const newBook = await axiosInstance.post('/books', bookData);
        const existingBooks = data ?? [];
        mutate('/books', [...existingBooks, newBook.data], false);
    };

    const updateBook = async (id: string, bookData: BookFormValues) => {
        const updatedBook = await axiosInstance.put(`/books/${id}`, bookData);
        const existingBooks = data ?? [];
        mutate(
            '/books',
            existingBooks.map((book) => (book.id === id ? updatedBook.data : book)),
            false
        );
    };

    const deleteBook = async (id: string) => {
        await axiosInstance.delete(`/books/${id}`);
        const existingBooks = data ?? [];

        mutate(
            '/books',
            existingBooks.filter((book) => book.id !== id)
        );
    };

    return {
        books: data,
        isLoading,
        isError: error,
        createBook,
        updateBook,
        deleteBook,
    };
};
