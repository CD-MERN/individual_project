import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useFindUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        async function findUser() {
            await axios.get('http://localhost:8000/api/user')
                .then(res => {
                    setUser(res.data.currentUser);
                    setLoading(false);
                }).catch(err => {
                    setLoading(false);
                });
        } findUser();
    }, []);
    return { user, isLoading };
}