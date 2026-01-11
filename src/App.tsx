import "@mantine/core/styles.css";
import { Products } from "./modules/Products/views";
import { AppShell, AppShellMain } from "@mantine/core";

function App() {
  return (
    <>
      <AppShell padding="md">
        <AppShellMain>
          <Products />
        </AppShellMain>
      </AppShell>
      <Products />
    </>
  );
}

export default App;
