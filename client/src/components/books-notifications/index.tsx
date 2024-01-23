import { Alert, Snackbar } from '@mui/material';
import { useBooksRequestStatus } from '@/store/books.ts';

export const BooksNotifications = () => {
    const {
        created,
        deleted,
        updated,
        createdFailure,
        updatedFailure,
        deletedFailure,
        isCreating,
        isUpdating,
        isDeleting,
        change,
    } = useBooksRequestStatus((state) => state);

    return (
        <>
            <Snackbar open={isCreating} message="Creating book..." />
            <Snackbar open={isUpdating} message="Updating..." />
            <Snackbar open={isDeleting} message="Deleting..." />

            <Snackbar open={created} autoHideDuration={6000} onClose={() => change('created', false)}>
                <Alert
                    onClose={() => change('created', false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Successfully created!
                </Alert>
            </Snackbar>

            <Snackbar open={deleted} autoHideDuration={6000} onClose={() => change('deleted', false)}>
                <Alert
                    onClose={() => change('deleted', false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Successfully deleted!
                </Alert>
            </Snackbar>

            <Snackbar open={updated} autoHideDuration={6000} onClose={() => change('updated', false)}>
                <Alert
                    onClose={() => change('updated', false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Successfully updated!
                </Alert>
            </Snackbar>

            <Snackbar open={createdFailure} autoHideDuration={6000} onClose={() => change('createdFailure', false)}>
                <Alert
                    onClose={() => change('createdFailure', false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Failed to create book!
                </Alert>
            </Snackbar>

            <Snackbar open={deletedFailure} autoHideDuration={6000} onClose={() => change('deletedFailure', false)}>
                <Alert
                    onClose={() => change('deletedFailure', false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Failed to delete book!
                </Alert>
            </Snackbar>

            <Snackbar open={updatedFailure} autoHideDuration={6000} onClose={() => change('updatedFailure', false)}>
                <Alert
                    onClose={() => change('updatedFailure', false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Failed to update book!
                </Alert>
            </Snackbar>
        </>
    );
};
