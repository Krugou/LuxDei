import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center'>
        <CircularProgress />
        </div>
    );
};
    
export default LoadingSpinner;