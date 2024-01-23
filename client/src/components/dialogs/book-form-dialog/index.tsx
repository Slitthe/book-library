import { useFormik } from 'formik';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { BookFormValues, FormValuesSchema } from '../../../schemas/book.ts';

interface BookFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: BookFormValues) => void;
    initialValues: BookFormValues;
    isUpdate: boolean;
}

const genres = [
    'Fantasy',
    'Science Fiction',
    'Mystery',
    'Thriller',
    'Romance',
    'Historical',
    'Non-Fiction',
    'Biography',
    'Self-Help',
    'Adventure',
];

const BookFormDialog = ({ open, onClose, onSubmit, initialValues, isUpdate }: BookFormDialogProps) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: FormValuesSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            onSubmit(values);
            onClose();
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isUpdate ? `Update the book ${formik.values.title}` : 'Create a New Book'} </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        id="author"
                        name="author"
                        label="Author"
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        error={formik.touched.author && Boolean(formik.errors.author)}
                        helperText={formik.touched.author && formik.errors.author}
                        margin="dense"
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="genre-label">Genre</InputLabel>
                        <Select
                            labelId="genre-label"
                            id="genre"
                            name="genre"
                            value={formik.values.genre}
                            label="Genre"
                            onChange={formik.handleChange}
                            error={formik.touched.genre && Boolean(formik.errors.genre)}
                        >
                            {genres.map((genre) => (
                                <MenuItem key={genre} value={genre}>
                                    {genre}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.genre && formik.errors.genre && (
                            <p style={{ color: 'red', fontSize: '0.75rem' }}>{formik.errors.genre}</p>
                        )}
                    </FormControl>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        id="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <div className="px-4 flex gap-4">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button variant="contained" type="submit">
                            {isUpdate ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default BookFormDialog;
