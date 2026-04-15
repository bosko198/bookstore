import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PersonalBooks from "./pages/PersonalBooks";
import PublicDomain from "./pages/PublicDomain";
import LicensedContent from "./pages/LicensedContent";
import AddBook from "./pages/AddBook";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 font-serif">
        <Navbar />
        <main className="p-10">
          <Routes>
            <Route path="/" element={<PersonalBooks />} />
            <Route path="/public" element={<PublicDomain />} />
            <Route path="/licensed" element={<LicensedContent />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;