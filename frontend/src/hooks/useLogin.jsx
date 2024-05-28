import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BASEURL;

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        setAlertMessage(null);

        if (!email || !password) {
            setError("Please enter valid information")
            return
        }

        try {
            const response = await axios.post(
                `${baseUrl}/users/login`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status !== 200) {
                setIsLoading(false);
                setError(error.response.data.error);
            }

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data));
                 // update the authContext
                dispatch({ type: "LOGIN", payload: response.data });
                setIsLoading(false);
                navigate("/");
            }
        } catch(error) {
            console.error(error);
            setIsLoading(false);

            if (error.response) {
                setError(error.response.data.error || 'An error occurred. Please try again.');
            } else if (error.request) {
                setError('No response received. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

  return {login, isLoading, error};
}
