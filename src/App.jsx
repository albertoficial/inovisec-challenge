import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Login from "./pages/Login";
import Loader from "./components/Loader";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const Map = lazy(() => import("./pages/Map"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/map"
        element={
          <PrivateRoute>
            <Suspense fallback={<Loader />}>
              <Map />
            </Suspense>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
