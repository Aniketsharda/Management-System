# 🎓 Student Management System

A complete Full Stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing student information with full CRUD functionality.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [MongoDB Setup](#mongodb-setup)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## ✨ Features

### Student Management
- ✅ **Create** new students with validation
- 📖 **Read** all students with search functionality
- ✏️ **Update** existing student information
- 🗑️ **Delete** students with confirmation dialog

### User Experience
- 🔍 **Real-time search** by name, email, or course
- 📱 **Responsive design** for all devices
- ⚡ **Loading states** and error handling
- ✅ **Success notifications** for all operations
- 🎨 **Modern UI** with hover effects and animations

### Technical Features
- 🛡️ **Form validation** (client & server-side)
- 🔄 **RESTful API** architecture
- 📊 **Statistics dashboard** with student metrics
- 🚀 **Optimized performance** with debounced search
- ♿ **Accessibility compliant** interface

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI Library with Hooks
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with CSS Grid and Flexbox

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Development Tools
- **Nodemon** - Auto-restart development server
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
student-management-system/
├── backend/                    # Backend API
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   └── studentController.js # Business logic
│   ├── middleware/
│   │   └── errorHandler.js     # Error handling middleware
│   ├── models/
│   │   └── Student.js         # Student schema/model
│   ├── routes/
│   │   └── studentRoutes.js   # API routes
│   ├── .env                   # Environment variables
│   ├── package.json           # Dependencies & scripts
│   └── server.js              # Entry point
│
├── frontend/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx     # Navigation component
│   │   │   ├── SearchBar.jsx  # Search functionality
│   │   │   ├── StudentCard.jsx # Individual student display
│   │   │   ├── StudentForm.jsx # Form for create/edit
│   │   │   └── StudentList.jsx # Students grid layout
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx       # Dashboard/listing page
│   │   │   ├── AddStudent.jsx # Create student page
│   │   │   └── EditStudent.jsx # Edit student page
│   │   ├── services/          # API integration
│   │   │   └── studentService.js # Axios API calls
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # Global styles
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md                   # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd student-management-system
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/student_management
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install
```

## 🏃‍♂️ Running the Application

### Start Backend Server
```bash
# From backend directory
cd backend
npm run dev

# Server will run on http://localhost:5000
```

### Start Frontend Development Server
```bash
# From frontend directory (new terminal)
cd frontend
npm run dev

# Frontend will run on http://localhost:5173
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Students
```http
GET /api/students
```
**Query Parameters:**
- `search` (optional) - Search by name, email, or course

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "64abc123...",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 22,
      "course": "Computer Science",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Get Single Student
```http
GET /api/students/:id
```

#### Create Student
```http
POST /api/students
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "age": 21,
  "course": "Data Science"
}
```

#### Update Student
```http
PUT /api/students/:id
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "email": "jane.updated@example.com",
  "age": 22,
  "course": "Data Science & AI"
}
```

#### Delete Student
```http
DELETE /api/students/:id
```

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Server Error

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Server**
   - Download from [MongoDB Official Site](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB Service**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (with Homebrew)
   brew services start mongodb/brew/mongodb-community
   
   # Linux (systemd)
   sudo systemctl start mongod
   ```

3. **Update .env file**
   ```env
   MONGODB_URI=mongodb://localhost:27017/student_management
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Create a new cluster (free tier available)
   - Set up database user and password
   - Whitelist your IP address

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Update .env file**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management?retryWrites=true&w=majority
   ```

## 🔧 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/student_management

# Optional: Add more configurations
# JWT_SECRET=your_jwt_secret_here
# EMAIL_SERVICE=your_email_service
```

### Frontend (Optional)
Create `frontend/.env` if needed:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🎨 UI Components Overview

### Navigation Bar (`Navbar.jsx`)
- Fixed top navigation with logo and menu links
- Active route highlighting
- Responsive design with mobile support

### Search Bar (`SearchBar.jsx`)
- Real-time search with 300ms debouncing
- Clear search functionality
- Search by name, email, or course

### Student Card (`StudentCard.jsx`)
- Individual student information display
- Avatar with student's initial
- Action buttons for edit and delete
- Hover animations and effects

### Student Form (`StudentForm.jsx`)
- Reusable form for create and edit operations
- Real-time validation with error messages
- Loading states during submission
- Accessibility features (labels, ARIA attributes)

### Student List (`StudentList.jsx`)
- Grid layout of student cards
- Loading spinner during data fetch
- Empty state when no students found
- Students count display

## 🚦 Getting Started - Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd student-management-system
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   ```

2. **Setup Database**
   - Install MongoDB locally or setup MongoDB Atlas
   - Update `backend/.env` with your connection string

3. **Run the Application**
   ```bash
   # Terminal 1: Start backend
   cd backend && npm run dev
   
   # Terminal 2: Start frontend
   cd frontend && npm run dev
   ```

4. **Access the App**
   - Open http://localhost:5173 in your browser
   - Start managing students!

## 🔍 Testing the Application

### Manual Testing Checklist

#### Create Student
- ✅ Fill valid student information
- ✅ Test form validation (empty fields, invalid email, age limits)
- ✅ Check success message and redirection

#### View Students
- ✅ Verify all students display correctly
- ✅ Test search functionality
- ✅ Check responsive layout on different screens

#### Update Student
- ✅ Edit existing student information
- ✅ Verify pre-populated form data
- ✅ Test validation on update

#### Delete Student
- ✅ Test confirmation dialog
- ✅ Verify student removal from list
- ✅ Check success notification

#### Navigation & UI
- ✅ Test all navigation links
- ✅ Verify responsive design on mobile/tablet
- ✅ Check loading states and error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style Guidelines

- Use ES6+ features (arrow functions, destructuring, async/await)
- Follow React Hooks best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent indentation (2 spaces)

## 🐛 Troubleshooting

### Common Issues

**Frontend not connecting to backend:**
- Verify backend is running on port 5000
- Check CORS configuration in backend
- Ensure no firewall blocking the connection

**Database connection failed:**
- Verify MongoDB is running
- Check connection string in .env file
- Ensure database permissions are correct

**Form validation not working:**
- Check browser console for JavaScript errors
- Verify form field names match state properties
- Ensure validation logic is implemented correctly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React.js team for the amazing library
- Express.js community for the robust framework
- MongoDB team for the flexible database
- All open source contributors

---

**Happy Coding! 🚀**

For questions or support, please open an issue in the repository.