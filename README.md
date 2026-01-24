# mothers dashboard frontend

## Overview
mother's dashboard Frontend is a React and TypeScript-based web application designed specifically for mothers focused on postpartum, pregnancy, and preconception care. The platform offers an intuitive and secure interface for mothers to access educational videos, courses, and manage their profiles.

## Key Features
- **User Role:** Mother — personalized content tailored to postpartum and pregnancy wellness.
- **Homepage:** Overview of available content and personalized recommendations.
- **Videos Page:** Stream categorized educational videos connected to a dedicated backend API.
- **Courses Page:** Browse and view structured courses relevant to maternal health.
- **Profile Management:** Editable user profiles for personalized experience.
- **Responsive Design:** Optimized for use on desktop and mobile devices.
- **Seamless Backend Integration:** Works with a separate backend for data retrieval and user authentication.

## Tech Stack
- React
- TypeScript
- TailwindCSS 
- Axios or Fetch API for backend communication

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn package manager

### Installation

git clone https://github.com/Mohithpeta/postpartum.git
cd DeepVital-Frontend
npm install
npm start
Usage
Ensure the backend server is running and accessible.

Run the frontend with npm start.

Open http://localhost:3000 in your browser.

Login as a mother user to access personalized content.

Folder Structure
bash
Copy
Edit
/src
  /components  - Reusable UI components
  /pages       - Main pages (Home, Videos, Courses, Profile)
  /services    - API call logic
  /styles      - Styling files
  /utils       - Utility functions
Contribution
This project was developed as part of an internship at DeepVital Pvt. Ltd., aimed at improving maternal health through digital education.
Architecture Overview
The Mother’s Dashboard frontend follows a layered React architecture focused on separation of concerns, maintainability, and scalability.
Presentation Layer: React pages and reusable components handle UI rendering and user interaction.
Routing & State: Client-side routing manages navigation between pages, while component-level state handles UI and session data.
Service Layer: A centralized API layer abstracts all backend communication, including authentication and data fetching.
Backend Integration: The frontend communicates with a separate backend service via secure REST APIs using JWT-based authentication.
This architecture enables:
Independent frontend/backend development
Easier testing and debugging
Clear ownership boundaries 
<img width="1000" height="2205" alt="postpartumfe" src="https://github.com/user-attachments/assets/3cd199d7-7f5a-4e11-9d2f-02bf01c90092" />

Contact
For questions or feedback, please contact Mohith Peta at mohitreddy2031@gmail.com.
