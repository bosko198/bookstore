import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export default function LicensedContent() {
  const [books, setBooks] = useState([]);

  const stripePromise = loadStripe("pk_test_placeholder");

  function handleBuy(book) {
    axios.post("http://localhost:5000/api/payment/create-checkout-session", {
      bookId: book._id,
      title: book.title,
      price: book.price,
    })
    .then(async (res) => {
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res.data.id });
    })
    .catch(err => console.error("Error creating checkout session:", err));
  };


  useEffect(() => {
    axios.get("http://localhost:5000/api/books/category/licensed")
      .then(res => setBooks(res.data))
      .catch(err => console.error("Error fetching licensed books:", err));
  }, []);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-6">Licensed Content</h2>
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
                href={`http://localhost:5000/${book.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 inline-block"
              >
                Download Free
              </a>
            ) : (
              <button
                onClick={() => handleBuy(book)}
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