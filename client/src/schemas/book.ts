import * as Yup from 'yup';
export const FormValuesSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    genre: Yup.string().required('Genre is required'),
    description: Yup.string().required('Description is required'),
});

export const BookSchema = FormValuesSchema.concat(
    Yup.object({
        id: Yup.string().required(),
    })
);

export const BooksSchema = Yup.array(BookSchema);

export type BookFormValues = Yup.InferType<typeof FormValuesSchema>;
export type Book = Yup.InferType<typeof BookSchema>;
