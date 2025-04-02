# FreelanceJobBoard

A full-stack web application that connects freelancers with clients, allowing users to post, browse, and apply for freelance jobs.

## Technologies Used

- **Frontend Framework**: React
- **Routing**: React Router
- **State Management**: Context API with custom hooks
- **HTTP Communication**: Custom request utility
- **Form Handling**: Controlled components with validation
- **Notifications**: React-toastify

## Key Features

- User Authentication (Register/Login/Logout)
- Job Management (Create, Edit, Delete)
- Job Application System
- Protected Routes with Guards
- Form Validation
- Persistent Authentication

## Project Structure

```
src/
├── api/                  # API service modules
│   └── applicationsApi.js
├── components/           # React components
│   ├── header/           # Navigation component
│   ├── home/             # Homepage component
│   ├── Jobs/             # Job-related components
│   │   ├── createJob/
│   │   ├── jobCatalog/
│   │   ├── jobDetails/
│   │   └── jobEdit/
│   ├── login/
│   ├── logout/
│   └── register/
├── contexts/             # React context definitions
├── guards/               # Route protection components
│   ├── AuthGuard.jsx
│   └── GuestGuard.jsx
├── hooks/                # Custom React hooks
│   ├── useAuth.js
│   └── usePersistedState.js
└── providers/            # Context providers
    └── UserProvider.jsx
```

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/IvanMishevski/FreelanceJobBoard.git
```

2. Install dependencies
```bash
npm install
```

3. Start the backend server
```bash
cd server
npm install
node server.js
```

4. Start the frontend development server
```bash
cd client
npm install
npm start
```

5. Navigate to `http://localhost:5173/`

## Environment Setup

Both the frontend and backend servers need to run simultaneously:
- Frontend: `http://localhost:5173/`
- Backend: `http://localhost:3030/`

## Main Features

### User Management
- User registration with email validation
- Login with credentials
- Authentication state persistence using localStorage
- Protected routes for authenticated users

### Job Management
- Browse all available jobs
- View detailed job information
- Create new job listings with validation
- Edit and delete own job listings
- Apply for jobs with application text

### Application System
- Submit applications for jobs
- View applications 

## Architecture

The application follows React's recommended practices:
- Component-based architecture
- Custom hooks for reusable logic
- Context API for state management
- Route guards for access control
- Persistent authentication state

## Security Features
- Protected routes with authentication guards
- Form validation on both client and server
- Secure authentication token storage
## Future Enhancements
- User profiles with profile pictures
- Job search and filtering
- Notifications for job applications
- User messaging system

