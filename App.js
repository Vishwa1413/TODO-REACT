import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    startDate: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    startDate: "",
    dueDate: "",
    priority: "medium",
    status: "pending",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    if (newTask.name.trim()) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({
        name: "",
        startDate: "",
        dueDate: "",
        priority: "medium",
        status: "pending",
      });
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditClick = (task) => {
    setEditingTask(task.id);
    setEditFormData({
      name: task.name,
      startDate: task.startDate,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
    });
  };

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveClick = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...editFormData } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleCancelClick = () => {
    setEditingTask(null);
  };

  return (
    <div className="App">
      <h1>Task Management</h1>

      <div className="add-task-form">
        <h2>Add New Task</h2>
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          value={newTask.name}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={newTask.startDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="dueDate"
          placeholder="Due Date"
          value={newTask.dueDate}
          onChange={handleInputChange}
        />
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          name="status"
          value={newTask.status}
          onChange={handleInputChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-table-container">
        <h2>Tasks</h2>
        <table>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Start Date</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                {editingTask === task.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="startDate"
                        value={editFormData.startDate}
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="dueDate"
                        value={editFormData.dueDate}
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <select
                        name="priority"
                        value={editFormData.priority}
                        onChange={handleEditFormChange}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditFormChange}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="save-button"
                        onClick={() => handleSaveClick(task.id)}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-button"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{task.name}</td>
                    <td>{task.startDate}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.priority}</td>
                    <td>{task.status}</td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
