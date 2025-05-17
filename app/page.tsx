'use client'

import { useState } from 'react'

export default function Home() {
  const [display, setDisplay] = useState('0')
  const [operator, setOperator] = useState<string | null>(null)
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [waitingForSecond, setWaitingForSecond] = useState(false)

  // Append digit or dot
  const inputDigit = (digit: string) => {
    if (waitingForSecond) {
      setDisplay(digit)
      setWaitingForSecond(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const handleOperator = (op: string) => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(display));
      setOperator(op);
      setDisplay(display + ' ' + op + ' ');
    } else if (waitingForSecond) {
      // Just update operator and display (replace operator)
      const parts = display.split(' ');
      parts[1] = op;
      setOperator(op);
      setDisplay(parts.join(' '));
    } else {
      // Calculate previous operation and update display
      const parts = display.split(' ');
      const secondOperand = parseFloat(parts[2]);
      if (operator!== null && !isNaN(secondOperand)) {
        const result = calculate(firstOperand, secondOperand, operator);
        setDisplay(result + ' ' + op + ' ');
        setFirstOperand(result);
        setOperator(op);
        setWaitingForSecond(true);
      }
    }
  };



  // Calculate result
  const calculate = (first: number, second: number, operator: string): number => {
    switch (operator) {
      case '+':
        return first + second
      case '-':
        return first - second
      case '×':
        return first * second
      case '÷':
        return second === 0 ? NaN : first / second
      default:
        return second
    }
  }

  // Handle equal press
  const handleEqual = () => {
    if (operator && firstOperand !== null) {
      const parts = display.split(' ');
      const secondOperand = parseFloat(parts[2]);
      if (isNaN(secondOperand)) return;

      const result = calculate(firstOperand, secondOperand, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecond(false);
    }
  };


  // Clear display
  const clearAll = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecond(false)
  }

  // Render calculator buttons
  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ]

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Calculator</h1>

      <div className="bg-gray-200 rounded p-4 text-right font-mono text-3xl mb-6 min-h-[60px]">
        {display}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4 rounded">
        <button
          onClick={clearAll}
          className="btn btn-error col-span-2 text-white bg-red-400 rounded"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {buttons.flat().map((btn) => {
          if (btn === '=') {
            return (
              <button
                key={btn}
                onClick={handleEqual}
                className="btn btn-primary"
              >
                =
              </button>
            )
          } else if (['+', '-', '×', '÷'].includes(btn)) {
            return (
              <button
                key={btn}
                onClick={() => handleOperator(btn)}
                className="btn btn-secondary"
              >
                {btn}
              </button>
            )
          } else if (btn === '.') {
            return (
              <button
                key={btn}
                onClick={() => {
                  if (!display.includes('.')) {
                    inputDigit('.')
                  }
                }}
                className="btn btn-outline"
              >
                .
              </button>
            )
          } else {
            return (
              <button
                key={btn}
                onClick={() => inputDigit(btn)}
                className="btn btn-outline"
              >
                {btn}
              </button>
            )
          }
        })}
      </div>
    </div>
  )
}
