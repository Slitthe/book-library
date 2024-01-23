import useSWR, { mutate } from 'swr';
import { BookFormValues, BooksSchema } from '@/schemas/book.ts';
import axiosInstance from '@/api';
import { useBooksRequestStatus } from '@/store/books.ts';

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
    const { change } = useBooksRequestStatus((state) => state);

    const { data, error, isLoading } = useSWR('/books', fetcher);

    const createBook = async (bookData: BookFormValues) => {
        try {
            change('isCreating', true);
            const newBook = await axiosInstance.post('/books', bookData);
            const existingBooks = data ?? [];
            await mutate('/books', [...existingBooks, newBook.data], false);
            change('created', true);
        } catch {
            change('createdFailure', true);
        } finally {
            change('isCreating', false);
        }
    };

    const updateBook = async (id: string, bookData: BookFormValues) => {
        try {
            change('isUpdating', true);
            const updatedBook = await axiosInstance.put(`/books/${id}`, bookData);
            const existingBooks = data ?? [];
            await mutate(
                '/books',
                existingBooks.map((book) => (book.id === id ? updatedBook.data : book)),
                false
            );
            change('updated', true);
        } catch {
            change('updatedFailure', true);
        } finally {
            change('isUpdating', false);
        }
    };

    const deleteBook = async (id: string) => {
        try {
            change('isDeleting', true);

            await axiosInstance.delete(`/books/${id}`);
            const existingBooks = data ?? [];

            await mutate(
                '/books',
                existingBooks.filter((book) => book.id !== id)
            );

            change('deleted', true);
        } catch {
            change('deletedFailure', true);
        } finally {
            change('isDeleting', false);
        }
    };

    return {
        books: data,
        isLoading: isLoading,
        isError: error,
        createBook,
        updateBook,
        deleteBook,
    };
};
