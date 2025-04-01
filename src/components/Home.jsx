import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const [isDark, setIsDark] = useState(true);

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId && allPastes.length > 0) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        console.log("Paste not found with ID:", pasteId);
      }
    }
  }, [pasteId, allPastes]);

  const createMyPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  // Toggle theme (dark/light)
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  // Handle drag-over to allow drop event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // When text is dropped, append it to the current content
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedText = e.dataTransfer.getData("text");
    setValue((prevValue) => prevValue + droppedText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-md">
            <div className="flex-1 relative w-full">
              <input
                className="w-full p-4 pl-12 text-lg border-0 rounded-xl bg-purple-700 text-white focus:ring-2 focus:ring-purple-500 focus:bg-gray-500 transition-all"
                type="text"
                placeholder="Paste title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <i className="fas fa-heading absolute left-4 top-1/2 -translate-y-1/2 text-gray-200"></i>
            </div>
            <button
              onClick={createMyPaste}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {pasteId ? "Update Paste ✨" : "Create Paste 🚀"}
            </button>
          </div>

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="fixed bottom-4 right-4 p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
          >
            {isDark ? "🌞" : "🌙"}
          </button>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
            <div className="relative">
              <textarea
                className="w-full p-6 pt-12 text-gray-700 dark:text-gray-100 border-0 rounded-xl bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-600 transition-all font-mono h-96"
                value={value}
                placeholder="// Your code/content here..."
                onChange={(e) => setValue(e.target.value)}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
              <div className="absolute top-4 left-6 flex items-center gap-2 text-gray-400 dark:text-gray-300">
                <i className="fas fa-code"></i>
                <span className="text-sm font-medium">Content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
