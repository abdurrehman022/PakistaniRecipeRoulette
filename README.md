# 🍛 Pakistani Recipe Roulette 🍽️

## 🌟 Project Overview
Welcome to **Pakistani Recipe Roulette**! This web application, built with the MERN stack, is designed to help users discover authentic Pakistani recipes based on the ingredients they have. The project aims to provide a seamless experience for exploring recipes, from browsing a curated collection to finding random recipes using a roulette feature.

## 🎯 Features
- **🎰 Recipe Roulette:** Spin the roulette to get a random recipe based on the ingredients you input.
- **📚 Recipe Browsing:** Explore a collection of 200 authentic Pakistani recipes with pagination and search functionality.
- **📖 Recipe Details:** Access detailed information including ingredients, cooking instructions, and images.
- **❤️ User Favorites:** Save and manage your favorite recipes.
- **🔒 User Authentication:** Secure login and user management with JWT and Google authentication.

## 💻 Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Google Authentication
- **Deployment:** Vercel
- **Version Control:** GitHub

## 🚀 Design and Development Process
1. **Setup and Initialization:**
   - Initialized Node.js project and set up project structure.
   - Installed necessary packages for both frontend and backend.

2. **Backend Development:**
   - Established a connection with MongoDB using Mongoose.
   - Defined database schemas for users and recipes.
   - Implemented API endpoints for user management and recipe operations.
   - Integrated JWT for secure authentication and session management.

3. **Frontend Development:**
   - Created React components for various pages including Home, Roulette, Recipe Browse, Recipe Details, and User Accounts.
   - Implemented React Context for state management and used `fetch` for API requests.
   - Designed responsive and user-friendly interfaces.

4. **Testing and Deployment:**
   - Conducted thorough testing using tools like Postman and React Testing Library.
   - Deployed the application to Vercel for frontend and configured backend for production.

## 🛠️ Challenges and Solutions
- **Challenge:** Managing user authentication securely.
  - **Solution:** Implemented JWT for secure token-based authentication and integrated Google login for enhanced security.

- **Challenge:** Efficiently fetching and displaying a large number of recipes.
  - **Solution:** Implemented pagination and search functionality to handle large datasets and improve user experience.

- **Challenge:** Ensuring a responsive design across different devices.
  - **Solution:** Used responsive design principles and tested on various screen sizes to ensure a consistent experience.

## 📜 User Guide
1. **Running the Project Locally:**
   - Clone the repository: `git clone <repository-url>`
   - Navigate to the project directory.
   - Install backend dependencies: `cd backend && npm install`
   - Install frontend dependencies: `cd frontend && npm install`
   - Start the backend server: `cd backend && npm start`
   - Start the frontend development server: `cd frontend && npm start`
   - Open your browser and go to `http://localhost:3000` to access the application.

2. **Features Usage:**
   - **Recipe Roulette:** Input up to 10 ingredients and click 'Spin' to get a random recipe.
   - **Browse Recipes:** Explore recipes using the search bar and pagination controls.
   - **View Recipe Details:** Click on any recipe to view detailed information.
   - **Manage Favorites:** Save recipes to your favorites and view them in the Favorites page.
   - **User Accounts:** Register, log in, and manage your profile.

## 🤝 How to Contribute
We welcome contributions to the Pakistani Recipe Roulette project! To get involved:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Submit a pull request with a clear description of your changes.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Stay tuned for updates as we continue to enhance **Pakistani Recipe Roulette**!
