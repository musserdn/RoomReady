import React, { useState, useEffect } from 'react';
import { Pencil, Trash, Plus } from 'lucide-react';
import { retrieveUsers, createUser, updateUser, deleteUser } from '../api/userAPI';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', name: '', password: '', type: '', room: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = async (user) => {
    try {
      // Ensure all required fields are included
      const updatedUser = {
        email: user.email,
        name: user.name,
        password: user.password, // Include password
        type: user.type,
        room: user.room,
      };
      await updateUser(user.id, updatedUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createUser(newUser);
      setNewUser({ email: '', name: '', password: '', type: '', room: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>User Maintenance</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Password</th>
            <th>Type</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.password}</td>
              <td>{user.type}</td>
              <td>{user.room}</td>
              <td>
                <Pencil onClick={() => handleEdit(user)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <Trash onClick={() => handleDelete(user.id)} style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
          {editingUser && (
            <tr>
              <td><input type="text" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} /></td>
              <td><input type="text" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} /></td>
              <td><input type="password" value={editingUser.password} onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })} /></td>
              <td><input type="text" value={editingUser.type} onChange={(e) => setEditingUser({ ...editingUser, type: e.target.value })} /></td>
              <td><input type="text" value={editingUser.room} onChange={(e) => setEditingUser({ ...editingUser, room: e.target.value })} /></td>
              <td><button onClick={() => handleUpdate(editingUser)}>Save</button></td>
            </tr>
          )}
          <tr>
            <td><input type="text" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /></td>
            <td><input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} /></td>
            <td><input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} /></td>
            <td><input type="text" value={newUser.type} onChange={(e) => setNewUser({ ...newUser, type: e.target.value })} /></td>
            <td><input type="text" value={newUser.room} onChange={(e) => setNewUser({ ...newUser, room: e.target.value })} /></td>
            <td><button onClick={handleCreate}><Plus /></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}