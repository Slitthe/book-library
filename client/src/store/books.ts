import { create } from 'zustand';

export type BooksRequestStatusValues = {
    created: boolean;
    updated: boolean;
    deleted: boolean;
    createdFailure: boolean;
    deletedFailure: boolean;
    updatedFailure: boolean;
    isCreating: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
};

export type BooksRequestStatusActions = {
    change: (key: keyof BooksRequestStatusValues, value: boolean) => void;
};

export const useBooksRequestStatus = create<BooksRequestStatusValues & BooksRequestStatusActions>((set) => ({
    created: false,
    updated: false,
    deleted: false,
    createdFailure: false,
    updatedFailure: false,
    deletedFailure: false,
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    change: (key: keyof BooksRequestStatusValues, value: boolean) => set((state) => ({ ...state, [key]: value })),
}));
