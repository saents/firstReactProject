import React, { useState } from "react";

const Counter = ({ name, mosh }) => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <div>
        <input
          type='text'
          onChange={(e) => {
            mosh(e.target.value);
          }}
        />
      </div>
      <h1>{name}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
