import { ToastContainer, Zoom } from "react-toastify";
import { AuthProvider } from "./presentation/contexts/AuthContext.tsx";
import AllRoutes from "./presentation/routes/AllRoutes.tsx";
import { EditorProvider } from "./presentation/contexts/EditorContext.tsx";
import { GameProvider } from "./presentation/contexts/GameContext.tsx";

function App() {
  return (
    <>
      <AuthProvider>
        <EditorProvider>
          <GameProvider>
            <AllRoutes />
          </GameProvider>
        </EditorProvider>
      </AuthProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        transition={Zoom}
      />
    </>
  );
}

export default App;
