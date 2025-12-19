import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SummaryCard } from './components/SummaryCard/SummaryCard';
import { ImageUpload } from './components/ImageUpload/ImageUpload';
import { DashboardPage } from './components/DashboardPage/DashboardPage';

function App() {
  return (
    <div className="App">
      <DashboardPage/>
    </div>
  );
}

export default App;
