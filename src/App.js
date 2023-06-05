import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: newTodo,
        completed: false,
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        title: 'Updated todo',
        completed: false,
      });
      const updatedTodos = todos.map((todo) => (todo.id === id ? response.data : todo));
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button className="add-button" onClick={addTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? 'completed' : 'incomplete'}`}
          >
            <span>{todo.title}</span>
            <div className="button-container">
              <button className="update-button" onClick={() => updateTodo(todo.id)}>Update</button>
              <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
            <span className="status">{todo.completed ? 'Completed' : 'Incomplete'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
