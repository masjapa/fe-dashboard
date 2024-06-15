import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import AdminLayout from './layouts/Admin';
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </AdminLayout>
    </Router>
  )
}
