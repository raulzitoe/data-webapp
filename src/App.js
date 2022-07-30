import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <Outlet />
    </QueryClientProvider>
  );
}

export default App;
