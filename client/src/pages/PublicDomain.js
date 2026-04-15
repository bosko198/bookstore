import { useEffect, useState } from "react";
import axios from "axios";

export default function PublicDomain() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/books/category/public")
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error fetching public domain books:", err));
  }, []);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">Public Domain Classics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <img src={
                book.coverUrl.startsWith("http")
                  ? book.coverUrl
                  : `http://localhost:5000/${book.coverUrl}`
              } alt={book.title} className="w-full h-64 object-cover rounded" />
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
            {book.price === 0 ? (
              <a
                href={book.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 inline-block"
              >
                Download Free
              </a>
            ) : (
              <button
                onClick={() => alert("Payment system coming soon!")}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Buy for ${book.price}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}