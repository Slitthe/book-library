import useSWR, { mutate } from 'swr';
import axiosInstance from '../api';
import { BookFormValues } from '../components/book-form-dialog';

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export const useBooks = () => {
    const { data, error } = useSWR('/books', fetcher);

    const createBook = async (bookData: BookFormValues) => {
        const newBook = await axiosInstance.post('/books', bookData);
        mutate('/books', [...data, newBook.data], false);
    };

    const updateBook = async (id: string, bookData: BookFormValues) => {
        const updatedBook = await axiosInstance.put(`/books/${id}`, bookData);
        mutate(
            '/books',
            data.map((book) => (book.id === id ? updatedBook.data : book)),
            false
        );
    };

    const deleteBook = async (id: string) => {
        await axiosInstance.delete(`/books/${id}`);
        mutate(
            '/books',
            data.filter((book) => book.id !== id)
        );
    };

    return {
        books: data,
        isLoading: !error && !data,
        isError: error,
        createBook,
        updateBook,
        deleteBook,
    };
};
