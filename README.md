# 🎓 Student Management System

A complete Full-Stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing student records with full CRUD functionality.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Database Setup](#-database-setup)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Core Functionality
- **Create** new student records with validation
- **Read** all students with search functionality
- **Update** existing student information
- **Delete** students with confirmation
- **Search** students by name, email, or course
- **Responsive design** that works on all devices

### 🔧 Technical Features
- Complete form validation (client & server-side)
- Error handling with user-friendly messages
- Success notifications for all operations
- Loading states and spinners
- Confirmation dialogs for destructive actions
- Professional dashboard design
- RESTful API architecture
- In-memory database fallback for development

## 🛠 Tech Stack

### Frontend
- **React.js 18** - UI Library
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS Modules** - Styling with scoped CSS
- **Functional Components** with React Hooks

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Other Packages
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **nodemon** - Development server auto-restart

## 📁 Project Structure

```
fullstackproject/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── memoryDB.js        # In-memory database fallback
│   ├── controllers/
│   │   └── studentController.js # Business logic
│   ├── models/
│   │   └── Student.js         # Student schema
│   ├── routes/
│   │   └── studentRoutes.js   # API routes
│   ├── middleware/
│   │   └── errorHandler.js    # Global error handling
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation component
│   │   │   ├── StudentForm.jsx # Reusable form component
│   │   │   ├── StudentCard.jsx # Student display card
│   │   │   ├── StudentList.jsx # List of students
│   │   │   └── SearchBar.jsx  # Search functionality
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Main dashboard
│   │   │   ├── AddStudent.jsx # Add student page
│   │   │   └── EditStudent.jsx # Edit student page
│   │   ├── services/
│   │   │   └── studentService.js # API service layer
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # Global styles
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md                  # This file
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB (optional - app includes fallback)

### Clone the Repository
```bash
git clone <repository-url>
cd fullstackproject
```

### Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd ../frontend
npm install
```

## 📖 Usage

### Running the Backend
```bash
cd backend
npm run dev
```
The backend server will start on **http://localhost:5000**

### Running the Frontend
```bash
cd frontend
npm run dev
```
The frontend will start on **http://localhost:5173** (or next available port)

### Access the Application
Open your browser and navigate to the frontend URL (usually http://localhost:5173).

## 🔗 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Students
- **URL**: `/students`
- **Method**: `GET`
- **Query Parameters**: 
  - `search` (optional): Search term for filtering students
- **Success Response**: 
  ```json
  {
    "success": true,
    "count": 3,
    "data": [...]
  }
  ```

#### Get Student by ID
- **URL**: `/students/:id`
- **Method**: `GET`
- **Success Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 22,
      "course": "Computer Science"
    }
  }
  ```

#### Create New Student
- **URL**: `/students`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 22,
    "course": "Computer Science"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Student created successfully",
    "data": {...}
  }
  ```

#### Update Student
- **URL**: `/students/:id`
- **Method**: `PUT`
- **Request Body**: Same as create
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Student updated successfully",
    "data": {...}
  }
  ```

#### Delete Student
- **URL**: `/students/:id`
- **Method**: `DELETE`
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Student deleted successfully"
  }
  ```

### Error Response Format
```json
{
  "success": false,
  "error": "Error message here"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request / Validation Error
- `404` - Not Found
- `500` - Server Error

## 🗄 Database Setup

### Option 1: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/student_management?retryWrites=true&w=majority
   USE_MEMORY_DB=false
   ```

### Option 2: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/student_management
   USE_MEMORY_DB=false
   ```

### Option 3: In-Memory Database (Development Only)
The application includes an in-memory database fallback that works out of the box:
```env
USE_MEMORY_DB=true
```

**Note**: In-memory database data will be lost when the server restarts.

## 📱 Application Features

### Dashboard
- Statistics cards showing total students, courses, and average age
- Search functionality with real-time filtering
- Responsive grid layout of student cards
- Quick actions for adding new students

### Student Management
- **Add Student**: Form with validation for creating new students
- **Edit Student**: Pre-populated form for updating student information
- **Delete Student**: Confirmation dialog before deletion
- **Search**: Filter students by name, email, or course

### Form Validation
- **Name**: 2-50 characters, required
- **Email**: Valid email format, unique, required
- **Age**: 16-100 years, required
- **Course**: 2-100 characters, required

### User Experience
- Loading states for all operations
- Success/error messages with auto-dismiss
- Responsive design for mobile and desktop
- Professional UI with hover effects
- Confirmation dialogs for destructive actions

## 🎨 UI Design

The application features a modern, clean design with:
- **Color Scheme**: Blue primary, neutral grays
- **Typography**: Inter font family
- **Layout**: Responsive grid system
- **Components**: Cards, buttons, forms with consistent styling
- **Animations**: Smooth transitions and hover effects

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
If you get "port in use" errors:
- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will automatically try the next available port

#### Database Connection Failed
- Check your MongoDB URI in `backend/.env`
- Ensure MongoDB service is running (if using local)
- The app will fall back to in-memory database automatically

#### CORS Issues
The backend is configured to accept requests from the frontend. If you change ports, update the CORS settings in `backend/server.js`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ for learning and demonstration purposes.

---

## 🚀 Quick Start Guide

1. **Clone and Install**:
   ```bash
   git clone <repo-url>
   cd fullstackproject
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open Application**: Navigate to http://localhost:5173

That's it! You now have a fully functional Student Management System running locally. 🎉

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository or reach out for support.

**Happy Coding! 🚀**