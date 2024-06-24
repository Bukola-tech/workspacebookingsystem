import React from 'react';
import BookingSystem from './components/BookingSystem';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Co-working Space Booking System</h1>
      <BookingSystem />
    </div>
  );
}

export default App;
