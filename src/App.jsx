import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Leaderboard,
  Login,
  Rounds,
  Round1,
  Round2,
  Round3,
} from "./components/index";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Rounds />} />
            <Route path="/round1" element={<Round1 />} />
            <Route path="/round2" element={<Round2 />} />
            <Route path="/round3" element={<Round3 />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
