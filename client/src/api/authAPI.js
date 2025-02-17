const API_BASE_URL = 'http://localhost:3001';

const login = async (userInfo) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('User information not retrieved, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from user login: ', err);
        return Promise.reject('Could not fetch user info');
    }
};

export { login };
