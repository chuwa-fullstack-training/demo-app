import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline w-fit m-auto">
        Vite + React
      </h1>
      <Button
        variant="default"
        className="m-auto mt-4 w-32 block"
        onClick={() => setCount(count => count + 1)}
      >
        count is {count}
      </Button>
    </>
  );
}

export default App;
