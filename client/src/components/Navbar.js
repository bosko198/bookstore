import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="p-6 bg-white shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Bozhidar’s Bookstore</h1>
      <nav className="space-x-6">
        <Link to="/" className="hover:text-blue-600">Personal Books</Link>
        <Link to="/public" className="hover:text-blue-600">Public Domain</Link>
        <Link to="/licensed" className="hover:text-blue-600">Licensed Content</Link>
        <Link to="/add" className="hover:text-blue-600">Add Book</Link>
      </nav>
    </header>
  );
}