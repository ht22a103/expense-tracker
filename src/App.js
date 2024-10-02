import React from 'react';
import ExpenseTracker from './components/ExpenseTracker';

import './styles.css'; 

const App = () => {
  return (
    <div>
      <h1>家計簿アプリ</h1>
      <ExpenseTracker />
    </div>
  );
};
export default App;