import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import InputScreen from "./pages/InputScreen";
import LoadingScreen from "./pages/LoadingScreen";
import BenefitsListScreen from "./pages/BenefitsListScreen";
import BenefitDetailScreen from "./pages/BenefitDetailScreen";

import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<InputScreen />} />
            <Route
              path="/loading"
              element={
                <ProtectedRoute requiredState="userInput">
                  <LoadingScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute requiredState="category">
                  <BenefitsListScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/benefit/:benefitId"
              element={
                <ProtectedRoute requiredState="selectedBenefit">
                  <BenefitDetailScreen />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
