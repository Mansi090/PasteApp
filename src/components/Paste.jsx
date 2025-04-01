import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter pastes based on the search term
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete action
  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted successfully");
  };

  // Handle copy to clipboard
  const handleCopy = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };

  // Handle share functionality
  const handleShare = (paste) => {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        })
        .then(() => toast.success("Shared successfully"))
        .catch(() => toast.error("Failed to share"));
    } else {
      toast.error("Web Share API is not supported in your browser");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Search Input */}
        <div className="relative mb-8">
          <input
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 w-full p-4 pl-12 text-lg border-0 rounded-xl bg-gray-100 shadow-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
            type="text"
            placeholder="Search pastes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>

        {/* Paste List */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => (
              <div
                key={paste._id}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">
                      {paste.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {paste.content.length > 100
                        ? paste.content.substring(0, 100) + "..."
                        : paste.content}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                      Created at: {new Date(paste.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <NavLink
                      to={`/?pasteId=${paste._id}`}
                      className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-center"
                    >
                      Edit
                    </NavLink>
                    <NavLink
                      to={`/pastes/${paste._id}`}
                      className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center"
                    >
                      View
                    </NavLink>
                    <button
                      onClick={() => handleDelete(paste._id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-center"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleCopy(paste.content)}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-center"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => handleShare(paste)}
                      className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-center"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-300 py-8">
              No pastes found. Create one to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
