"use client";

import { useAnalytics } from "../../hooks/useAnalytics";

export default function ExampleUsage() {
  const { trackButtonClick, trackFormSubmission, trackPurchase } =
    useAnalytics();

  const handleButtonClick = () => {
    trackButtonClick("example_button", "example_page");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmission("example_form");
    // Handle form submission logic
  };

  const handlePurchase = () => {
    trackPurchase(500, "INR");
    // Handle purchase logic
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Analytics Example</h2>

      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Track Button Click
      </button>

      <form onSubmit={handleFormSubmit} className="space-y-2">
        <input
          type="email"
          placeholder="Enter email"
          className="px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit Form (Tracked)
        </button>
      </form>

      <button
        onClick={handlePurchase}
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Track Purchase (₹500)
      </button>
    </div>
  );
}
