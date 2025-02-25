import React, { useState, useEffect } from 'react';
import { Pencil, Trash, Plus } from 'lucide-react';
import { retrieveRooms, createRoom, updateRoom, deleteRoom } from '../api/roomAPI';

export default function RoomPage() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ room: '', status: 'Scheduled' });
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await retrieveRooms();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom({
      id: room.id,
      room: room.room,
      status: room.status,
    });
  };

  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const handleUpdate = async (room) => {
    try {
      const updatedRoom = {
        room: room.room,
        status: room.status,
      };
      await updateRoom(room.id, updatedRoom);
      setEditingRoom(null);
      fetchRooms();
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await createRoom(newRoom);
      setNewRoom({ room: '', status: 'Scheduled' });
      fetchRooms();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Room Maintenance</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Room</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.room}</td>
              <td>{room.status}</td>
              <td>
                <Pencil onClick={() => handleEdit(room)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <Trash onClick={() => handleDelete(room.id)} style={{ cursor: 'pointer' }} />
              </td>
            </tr>
          ))}
          {editingRoom && (
            <tr key={`editing-${editingRoom.id}`}>
              <td>{editingRoom.room}</td>
              <td>
                <select value={editingRoom.status} onChange={(e) => setEditingRoom({ ...editingRoom, status: e.target.value })}>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Clean">Clean</option>
                  <option value="Skip Today">Skip Today</option>
                </select>
              </td>
              <td><button onClick={() => handleUpdate(editingRoom)}>Save</button></td>
            </tr>
          )}
          <tr key="new-room">
            <td><input type="text" value={newRoom.room} onChange={(e) => setNewRoom({ ...newRoom, room: e.target.value })} /></td>
            <td>
              <select value={newRoom.status} onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}>
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Clean">Clean</option>
                <option value="Skip Today">Skip Today</option>
              </select>
            </td>
            <td><button onClick={handleCreate}><Plus /></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}