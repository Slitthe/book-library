import useSWR, { mutate } from 'swr';
import axiosInstance from '../api';
import { BooksSchema, BookFormValues } from '../schemas/book.ts';
import { useState } from 'react';

const fetcher = async (url: string) => {
    const response = await axiosInstance.get(url);
    const data = await response.data;

    try {
        return BooksSchema.validateSync(data);
    } catch (e) {
        throw new Error('Failed to get data');
    }
};

type UseBooksArgs = {
    onDelete?: () => void;
    onDeleteError?: () => void;
    onUpdate?: () => void;
    onUpdateError?: () => void;
    onCreate?: () => void;
    onCreateError?: () => void;
};
export const useBooks = ({
    onDelete,
    onUpdate,
    onCreate,
    onCreateError,
    onUpdateError,
    onDeleteError,
}: UseBooksArgs = {}) => {
    const { data, error, isLoading } = useSWR('/books', fetcher);
    console.log({ isLoading });
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const createBook = async (bookData: BookFormValues) => {
        try {
            setIsCreating(true);
            const newBook = await axiosInstance.post('/books', bookData);
            const existingBooks = data ?? [];
            await mutate('/books', [...existingBooks, newBook.data], false);
            if (onCreate) {
                onCreate();
            }
        } catch {
            if (onCreateError) {
                onCreateError();
            }
        } finally {
            setIsCreating(false);
        }
    };

    const updateBook = async (id: string, bookData: BookFormValues) => {
        try {
            setIsUpdating(true);
            const updatedBook = await axiosInstance.put(`/books/${id}`, bookData);
            const existingBooks = data ?? [];
            await mutate(
                '/books',
                existingBooks.map((book) => (book.id === id ? updatedBook.data : book)),
                false
            );
            if (onUpdate) {
                onUpdate();
            }
        } catch {
            if (onUpdateError) {
                onUpdateError();
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const deleteBook = async (id: string) => {
        try {
            setIsDeleting(true);
            await axiosInstance.delete(`/books/${id}`);
            const existingBooks = data ?? [];

            await mutate(
                '/books',
                existingBooks.filter((book) => book.id !== id)
            );

            if (onDelete) {
                onDelete();
            }
        } catch {
            if (onDeleteError) {
                onDeleteError();
            }
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        books: data,
        isLoading,
        isError: error,
        isDeleting,
        isCreating,
        isUpdating,
        createBook,
        updateBook,
        deleteBook,
    };
};
