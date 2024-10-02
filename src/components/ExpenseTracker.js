import React, { useState } from 'react';
import OCRReader from './OCR';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    if (!amount) {
      alert('金額を入力してください');
      return;
    }
    const newExpense = {
      id: Date.now(),
      amount: parseFloat(amount),
    };
    setExpenses([...expenses, newExpense]);
    setAmount(''); // 入力欄をリセット
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const getTotalAmount = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
  };

  return (
    <div>
      <OCRReader setAmount={setAmount} />
      <button onClick={addExpense} disabled={!parseFloat(amount)}>
        支出を追加
      </button>
      <h2>支出の一覧</h2>
      <table>
        <thead>
          <tr>
            <th>金額</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>¥{expense.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => deleteExpense(expense.id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>合計支出: ¥{getTotalAmount()}</h2>
    </div>
  );
};

export default ExpenseTracker;
