import "@mantine/core/styles.css";
import { Products } from "./modules/Products/views";
import { AppShell, AppShellMain, Container } from "@mantine/core";

function App() {
  return (
    <AppShell style={{ backgroundColor: "#f8f9fa" }}>
      <AppShellMain>
        <Container size="lg" py="xl">
          <Products />
        </Container>
      </AppShellMain>
    </AppShell>
  );
}

export default App;
