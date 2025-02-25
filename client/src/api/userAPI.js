import Auth from '../utils/auth';

const API_BASE_URL = '' // change to  'http://localhost:3001' for dev // comment for PR 

const retrieveUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid user API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return [];
    }
};

const retrieveUser = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid user API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return {};
    }
}

const createUser = async (user) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid user API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return {};
    }
}

const updateUser = async (id, user) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid user API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return {};
    }
}

const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid user API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return {};
    }
}

export { retrieveUsers, retrieveUser, createUser, updateUser, deleteUser };
