import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BASEURL;

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate()

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null)

        if (!username|| !email || !password) {
            setError("Please enter valid information")
            return
        }

        try {
            const response = await axios.post(
                `${baseUrl}/users/signup`,
                { username, email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status === 201) {
                localStorage.setItem("user", JSON.stringify(response.data));
                // update the authContext
                dispatch({ type: "LOGIN", payload: response.data });
                setIsLoading(false);
                navigate("/");
            } else {
                setIsLoading(false);
                setError('An unexpected error occurred. Please try again.');
            }

        } catch(error) {
            console.error(error);
            setIsLoading(false);
        }

    }

  return { signup, isLoading, error }
}

