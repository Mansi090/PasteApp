Paste App 📝
A lightweight and efficient web application for creating, storing, and managing text snippets with ease. Whether you're a developer saving code snippets, a writer jotting down ideas, or anyone who needs quick access to text-based content, Paste App is your go-to solution!

🚀 Features
✔ Create & Save Pastes – Easily store text snippets with unique titles.
✔ Edit & Update – Modify saved pastes without losing previous data.
✔ Delete & Reset – Remove specific pastes or clear all with a single click.
✔ Clipboard Copying – Quickly copy paste content for easy sharing.
✔ Persistent Storage – Data is saved using localStorage, ensuring your pastes remain intact even after refreshing the page.
✔ Smooth User Experience – Built with React.js, Redux Toolkit, and React Hot Toast for seamless interaction and real-time feedback.

🛠️ Tech Stack
Frontend: React.js, Redux Toolkit, React Router
State Management: Redux Toolkit
Notifications: React Hot Toast
UI & Styling: Tailwind CSS (or your preferred styling library)
Data Persistence: localStorage
📦 Installation & Setup
Follow these simple steps to set up the project on your local machine:

1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/paste-app.git
cd paste-app
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Start the Development Server
bash
Copy
Edit
npm run dev
The app should now be running on http://localhost:5173/ (or another available port if 5173 is in use).

🖥️ Usage Guide
Create a Paste – Enter a title and content, then save it.
Edit a Paste – Click on an existing paste, modify its content, and save the changes.
Copy to Clipboard – Use the "Copy" button to copy text instantly.
Delete a Paste – Remove an individual paste if no longer needed.
Reset All – Clear all saved pastes at once.
🛠️ Project Structure
php
Copy
Edit
paste-app/
│── src/
│   ├── components/       # Reusable UI components
│   ├── redux/            # Redux state management (pasteSlice.js)
│   ├── pages/            # Page components (ViewPaste, Home, etc.)
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # React entry point
│── public/               # Static assets
│── package.json          # Dependencies & scripts
│── README.md             # Project documentation
📌 Future Enhancements
🔹 User Authentication – Login system for personalized pastes.
🔹 Cloud Storage – Sync pastes across devices.
🔹 Syntax Highlighting – Improve code snippet readability.
🔹 Dark Mode – Enhance the UI with light/dark theme toggle.
🤝 Contributing
Contributions are always welcome! Feel free to fork the repo, create a new branch, and submit a pull request.

📄 License
This project is open-source and available under the MIT License.

📢 Have any suggestions or issues? Create an issue or open a discussion in the repository. Happy coding! 🚀🎉

