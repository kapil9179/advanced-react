import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My Website</h1>
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <nav className={`md:flex space-x-4 ${menuOpen ? "block" : "hidden"}`}>
          <a href="#" className="block md:inline hover:text-gray-300">Home</a>
          <a href="#" className="block md:inline hover:text-gray-300">About</a>
          <a href="#" className="block md:inline hover:text-gray-300">Services</a>
          <a href="#" className="block md:inline hover:text-gray-300">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
