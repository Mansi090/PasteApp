/** @format */
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Helper function to generate a unique ID
const generateUniqueId = () => Date.now().toString();

// Load pastes from localStorage or initialize an empty array
const loadPastesFromLocalStorage = () => {
  try {
    const pastes = localStorage.getItem("pastes");
    return pastes ? JSON.parse(pastes) : [];
  } catch (error) {
    console.error("Error loading pastes from localStorage:", error);
    return [];
  }
};

// Fetch pastes (for use in components)
export const fetchPastes = () => {
  return loadPastesFromLocalStorage();
};

// Initial state
const initialState = {
  pastes: loadPastesFromLocalStorage(),
};

// Create the paste slice
export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    // Add a new paste
    addToPastes: (state, action) => {
      const paste = action.payload;

      // Ensure the paste has a unique ID
      if (!paste._id) {
        paste._id = generateUniqueId();
      }

      // Check for duplicate titles
      if (state.pastes.some((p) => p.title === paste.title)) {
        toast.error("A paste with this title already exists!");
        return;
      }

      // Add the paste to the state and update localStorage
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully!");
    },

    // Update an existing paste
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex((p) => p._id === updatedPaste._id);

      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated Successfully!");
      } else {
        toast.error("Paste not found!");
      }
    },

    // Remove a paste by ID
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const updatedPastes = state.pastes.filter((p) => p._id !== pasteId);

      if (updatedPastes.length !== state.pastes.length) {
        state.pastes = updatedPastes;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Removed Successfully!");
      } else {
        toast.error("Paste not found!");
      }
    },

    // Reset all pastes
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All Pastes Reset!");
    },
  },
});

// Export actions
export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes } =
  pasteSlice.actions;

// Export the reducer
export default pasteSlice.reducer;
