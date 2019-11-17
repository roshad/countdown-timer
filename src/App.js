import React from 'react';

import './App.css';
import Card from './Card'
function App() {
  return (
    <div id="timers">
      <Card dur={600000}/>
      <Card dur={300000}/>
    </div>
  );
}

export default App;
