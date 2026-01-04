import { useState } from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { Button, MantineProvider } from "@mantine/core";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MantineProvider>
        <h1>Hello, world</h1>
        <Button
          onClick={() => {
            setCount((p) => ++p);
          }}
        >
          click me {count}
        </Button>
      </MantineProvider>
    </>
  );
}

export default App;
