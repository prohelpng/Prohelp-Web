import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RootPage from "./pages/"
import Footer from "./layouts/footers/"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<RootPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
