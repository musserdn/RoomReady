import Auth from '../utils/auth';

const retrieveRooms = async () => {
    try {
        const response = await fetch('/api/rooms', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid room API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return [];
    }
};

const retrieveRoom = async (id) => {
    try {
        const response = await fetch(`/api/rooms/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid room API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return {};
    }
}  

const createRoom = async (room) => {
    try {
        const response = await fetch('/api/rooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify(room),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid room API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return {};
    }
}

const updateRoom = async (id, room) => {
    try {
        const response = await fetch(`/api/rooms/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify(room),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error('invalid room API response, check network tab!');
        }
        return data;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return {};
    }
}

const deleteRoom = async (id) => {
    try {
        const response = await fetch(`/api/rooms/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`,
            },
        });
        if (!response.ok) {
            throw new Error('invalid room API response, check network tab!');
        }
        return true;
    }
    catch (err) {
        console.log('Error from data retrieval:', err);
        return false;
    }
}

export { retrieveRooms, retrieveRoom, createRoom, updateRoom, deleteRoom };