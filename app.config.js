import dotenv from 'dotenv';

dotenv.config();

export default {
    // All values in extra will be passed to the app.
    extra: {
        apiURL: process.env.REACT_NATIVE_API_URL || 'http://192.168.15.1:8000',
    },
};
