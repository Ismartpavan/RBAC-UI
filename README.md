
# Role-Based Access Control (RBAC) UI

## Overview

This project implements a **Role-Based Access Control (RBAC)** User Interface (UI) built using **React.js**. The application allows administrators to manage users, roles, and permissions. Users are assigned roles, and roles define permissions to perform certain actions (such as reading, writing, and deleting). Only authorized users with the appropriate roles and permissions can access or modify specific resources.

### Features
- **User Management**: Add, edit, delete users, and assign roles.
- **Role Management**: Create, edit, delete roles, and assign permissions (Read, Write, Delete).
- **Authentication**: Admin login is required to access the application.
- **Search and Sorting**: Search and sort users by name.
- **Permissions**: Define roles with permissions (Read, Write, Delete).
  
### Tech Stack
- **Frontend**: React.js, JavaScript (ES6), HTML, CSS
- **State Management**: React hooks (`useState`)

---

## Project Setup and Installation

### Prerequisites

Before you start, make sure you have the following installed on your local machine:
- **Node.js** (Download from [Node.js website](https://nodejs.org/))
- **npm** (Comes installed with Node.js)

### Installation Steps

1. **Clone the repository**:
   First, clone the project repository to your local machine.

  
   git clone https://github.com/your-username/RBAC-UI.git
Navigate to the project folder: Change the directory to your project folder.


cd RBAC-UI
Install the dependencies: Run the following command to install the necessary dependencies.


npm install
Run the development server: To run the project locally, use the following command:


npm start
This will start the development server, and you can access the application in your browser at http://localhost:3000.

Project Structure
Here’s the basic structure of the project:



/RBAC-UI
  /public
    index.html      // Main HTML file where React app is mounted
  /src
    /components
      App.js         // Main React component containing RBAC UI logic
    /assets
      /images
    style.css        // Global styles for the app
  package.json       // Project metadata and dependencies
  README.md          // This file
  
#Key Files:

App.js:
This file contains the main logic for handling the UI, including user management, role management, authentication, and validation.

style.css:
This file contains all the styling for the application, ensuring it looks clean and responsive.


How the Application Works
1. Authentication
The application starts with an authentication form. Only users with the correct credentials (username and password) can access the main interface.

Login Form: The login form consists of:
Username Field: Enter the username (default: admin@rbac.com).
Password Field: Enter the password (default: admin123).
Validation: The following validations occur on the login form:
If username is not entered, the message "Please enter username" is displayed.
If password is not entered, the message "Please enter password" is displayed.
If the password is incorrect, a message "Incorrect password" appears.
Once correct credentials are entered, the user is authenticated and granted access to the RBAC dashboard.

2. RBAC UI (Role-Based Access Control)
The main dashboard contains two tabs: Users and Roles. This UI allows administrators to manage users and roles.

User Management:
Add User: Admins can add new users by entering their name, selecting a role, and setting the user’s status (Active/Inactive).
Edit User: Admins can edit an existing user’s details.
Delete User: Admins can delete users from the list.
User Form Validation:

Users must provide both a name and a role for a valid form submission. Invalid or incomplete forms will display an error.
Role Management:
Add Role: Admins can create new roles by specifying a role name and selecting its associated permissions (Read, Write, Delete).
Edit Role: Admins can edit the name and permissions of an existing role.
Delete Role: Admins can delete a role from the system.
Role Permissions: Roles come with predefined permissions that can be set as Read, Write, or Delete. Only users with the appropriate permissions can perform specific actions.

Search and Sorting:
Search: Admins can search users by name using the search bar.
Sort: Admins can toggle sorting between ascending and descending order by name.
Detailed Breakdown of Features
Authentication Flow
The authentication is managed by checking the entered username and password against predefined values:

Username: admin@rbac.com
Password: admin123
Upon entering correct credentials, the user gains access to the RBAC dashboard.

User Management
Add or Edit Users:

A form is provided to add new users or edit existing ones.
Upon submission, the data is validated (name and role must be filled).
If the user is being edited, the changes are updated in the users list.
If the user is new, a new user is added with a unique ID.
Delete User:

Clicking the "Delete" button removes the selected user from the list.
Role Management
Add or Edit Roles:

A form allows the creation or modification of roles.
Roles are assigned specific permissions (Read, Write, Delete).
Permissions are represented by checkboxes, where the admin can check/uncheck permissions.
Delete Role:

Clicking the "Delete" button removes the selected role from the list.
Search and Sort
The search functionality allows filtering users by name.
Sorting functionality allows users to sort the list of users either in ascending or descending order based on their name.

How to Extend the Application

Adding More Roles: To add more roles, you simply need to add new entries to the roles array in the state.
Adding More Permissions: You can extend the role permissions by adding more checkboxes and handling them in the state logic.
Improving Authentication: For production-level applications, implement a secure authentication system using tools like JWT (JSON Web Tokens) and integrate it with a backend server.


#Conclusion

This project is a simple Role-Based Access Control (RBAC) UI implemented using React.js. It demonstrates how to manage users, roles, and permissions in a web application. The authentication mechanism ensures that only authorized users can access and modify data. The flexibility of adding, editing, and deleting users and roles makes it a robust RBAC system for various use cases.


