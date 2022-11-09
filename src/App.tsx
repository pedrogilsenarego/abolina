import Menu from "./modules/Menu";
import TopBar from "./modules/TopBar"
import AppRoutes from "./routes";


function App() {
  return (
    <div>
      <TopBar />
      <Menu />
      <AppRoutes />
    </div>
  );
}

export default App;
