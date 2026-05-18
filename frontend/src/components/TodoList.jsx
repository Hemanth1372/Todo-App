import React, { useState, useEffect } from 'react';
import { todosAPI } from '../api';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todosAPI.getAll();
      setTodos(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const response = await todosAPI.update(todo.id, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t.id === response.data.id ? response.data : t)));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todosAPI.delete(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete todo');
    }
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority || 'medium'}`;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) return <div className="loading">Loading todos...</div>;

  return (
    <div className="todo-list-container">
      {error && <div className="error-message">{error}</div>}
      <div className="todos-grid">
        {todos.length === 0 ? (
          <p className="empty-message">No todos yet. Create one to get started!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="todo-header">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                  className="todo-checkbox"
                />
                <h3>{todo.title}</h3>
              </div>
              {todo.description && <p className="todo-description">{todo.description}</p>}
              <div className="todo-meta">
                {todo.due_date && (
                  <span className="due-date">📅 {formatDate(todo.due_date)}</span>
                )}
                <span className={`priority ${getPriorityClass(todo.priority)}`}>
                  {todo.priority}
                </span>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                title="Delete todo"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
