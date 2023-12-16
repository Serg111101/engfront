import axios from '../../axios/axios';
import useAuth from './AdminHooks/useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth()

    const refresh = async () => {
        if (auth.refreshToken) {
            const response = await axios.post('/refresh', { refreshToken: auth?.refreshToken });

            setAuth((prev) => {
                return {
                    ...prev,
                    role: response.data.role,
                    accessToken: response.data.accessToken
                }
            });
            return response.data.accessToken;
        }
    }
    return refresh;
};

export default useRefreshToken;
