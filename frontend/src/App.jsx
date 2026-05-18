import React, { useState } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./components/Login";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

const AppContent = () => {
  const { user, logout, loading } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>📝 My TODO App</h1>

          <div className="header-right">
            <span className="user-email">{user.email}</span>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <TodoForm onTodoCreated={() => setRefreshKey(refreshKey + 1)} />
        <TodoList key={refreshKey} />
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;