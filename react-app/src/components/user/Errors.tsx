import { Box, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

const Errors = ({ message }: { message: string }) => {

    return (<>
        <Box display="flex" alignItems="center" color="error.main">
            <ErrorOutline />
            <Typography variant="body2" style={{ marginLeft: '8px' }}>
                {message}
            </Typography>
        </Box>
    </>)

}
export default Errors;