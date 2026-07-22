# Build PrintHub – Full Stack React +  Printing Management Platform
Create a modern, scalable, production-ready full-stack web application called **PrintHub** using **React JSX (Vite)** for the frontend and a modular backend architecture. Follow the exact project structure provided and maintain clean, reusable, component-based development practices.

### Project Structure
Set up a React JSX project according to
the following file structure:

PROJECT FILE STRUCTURE
───────────────────────
PrintHub/
│
├── frontend/                          # React JSX (Vite) application
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── manifest.json             # PWA manifest
│   │   ├── robots.txt
│   │   └── images/                   # Static images (logos, icons)
│   │
│   ├── src/
│   │   ├── user/                     # USER-FACING MODULE
│   │   │   ├── assets/
│   │   │   │   ├── images/
│   │   │   │   ├── fonts/
│   │   │   │   └── scss/            # SCSS partials scoped to user module
│   │   │   │
│   │   │   ├── components/          # Reusable, stateless UI components (e.g., Button.jsx, Button.css)
│   │   │   │   ├── ui/              # Primitive UI (Button, Input, Modal, Card, etc.)
│   │   │   │   └── shared/          # Composite components (Navbar, Footer, ServiceCard, etc.)
│   │   │   │
│   │   │   ├── features/            # Domain-specific modules (e.g., auth.jsx, auth.css)
│   │   │   │   ├── auth/            # Sign Up, Sign In, OTP, Forgot Password
│   │   │   │   ├── print/           # Normal & Advanced Print flows
│   │   │   │   ├── services/        # Services grid & details
│   │   │   │   ├── pricing/         # Pricing calculator
│   │   │   │   ├── cart/            # Cart & checkout
│   │   │   │   ├── payment/         # Payment gateway integration
│   │   │   │   ├── profile/         # User profile & dashboard
│   │   │   │   └── orders/          # Order history & tracking
│   │   │   │
│   │   │   ├── pages/               # Route-level page components (e.g., Home.jsx, Home.css)
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   ├── Services.jsx
│   │   │   │   ├── ServiceDetails.jsx
│   │   │   │   ├── NormalPrint.jsx
│   │   │   │   ├── AdvancedPrint.jsx
│   │   │   │   ├── PricingCalculator.jsx
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   ├── OrderSuccess.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── OrderHistory.jsx
│   │   │   │   ├── OrderTracking.jsx
│   │   │   │   └── NotFound.jsx
│   │   │   │
│   │   │   ├── layouts/             # Layout wrappers (e.g., UserLayout.jsx)
│   │   │   │
│   │   │   ├── context/             # React Context providers (AuthContext, CartContext, etc.)
│   │   │   │
│   │   │   ├── routes/              # Route definitions & guards for user module
│   │   │   │   └── UserRoutes.jsx
│   │   │   │
│   │   │   └── index.js             # Barrel export for the user module
│   │   │
│   │   ├── admin/                    # ADMIN-FACING MODULE
│   │   │   ├── assets/
│   │   │   │   ├── images/
│   │   │   │   └── scss/
│   │   │   │
│   │   │   ├── components/          # Reusable, stateless UI components (e.g., Button.jsx, Button.css)
│   │   │   │   ├── ui/              # Primitive UI (DataTable, Modal, Form fields, etc.)
│   │   │   │   └── shared/          # Composite (Sidebar, Header, Charts, etc.)
│   │   │   │
│   │   │   ├── features/            # Domain-specific admin modules
│   │   │   │   ├── dashboard/       # KPIs, analytics
│   │   │   │   ├── users/           # User management
│   │   │   │   ├── services/        # Service & spec field management
│   │   │   │   ├── pricing/         # Pricing rules
│   │   │   │   ├── orders/          # Order management
│   │   │   │   └── content/         # CMS (banners, about, etc.)
│   │   │   │
│   │   │   ├── pages/               # Route-level page components (e.g., Dashboard.jsx, Dashboard.css)
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Users.jsx
│   │   │   │   ├── Services.jsx
│   │   │   │   ├── Pricing.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   ├── Content.jsx
│   │   │   │   ├── Settings.jsx
│   │   │   │   └── Login.jsx
│   │   │   │
│   │   │   ├── layouts/             # Admin layout (Sidebar + Header)
│   │   │   │
│   │   │   ├── context/             # Admin Context providers
│   │   │   │
│   │   │   ├── routes/              # Route definitions & guards for admin module
│   │   │   │   └── AdminRoutes.jsx
│   │   │   │
│   │   │   └── index.js             # Barrel export for the admin module
│   │   │
│   │   ├── hooks/                   # Shared custom hooks (useAuth, useFetch, useDebounce, etc.)
│   │   │
│   │   ├── services/                # Cross-module business logic / API clients
│   │   │   └── api/                 # Axios/Fetch instances & endpoint modules
│   │   │       ├── client.js
│   │   │       ├── authApi.js
│   │   │       ├── orderApi.js
│   │   │       └── serviceApi.js
│   │   │
│   │   ├── store/                   # Global state management (Redux/Zustand/Context)
│   │   │
│   │   ├── utils/                   # Pure helper functions (formatters, validators)
│   │   │
│   │   ├── constants/               # App-wide constants, enums, config keys
│   │   │
│   │   ├── styles/                  # Global CSS styles (reset, variables, theme)
│   │   │   ├── index.css            # Tailwind / global imports
│   │   │   ├── variables.css
│   │   │   └── reset.css
│   │   │
│   │   ├── routes/                  # Top-level router config
│   │   │   ├── AppRoutes.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── App.jsx                  # Root component
│   │   ├── App.css
│   │   ├── main.jsx                 # Vite entry point (ReactDOM.createRoot)
│   │   └── index.html               # Vite root HTML template (project root, NOT in public/)
│   │
│   ├── .env                         # VITE_* environment variables
│   ├── .env.example
│   ├── .eslintrc.cjs
│   ├── .prettierrc
│   ├── .gitignore
│   ├── vite.config.js               # Vite configuration (aliases, plugins)
│   ├── jsconfig.json                # Path aliases (@/...)
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── backend/                          # Node.js / Express API server
│   ├── src/
│   │   ├── config/                  # DB, env, third-party service configs
│   │   │   ├── db.js
│   │   │   ├── cloudinary.js
│   │   │   └── index.js
│   │   │
│   │   ├── controllers/             # Route handlers (thin)
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── orderController.js
│   │   │   ├── serviceController.js
│   │   │   └── pricingController.js
│   │   │
│   │   ├── models/                  # Mongoose / Sequelize models
│   │   │   ├── User.js
│   │   │   ├── Order.js
│   │   │   ├── Service.js
│   │   │   ├── PriceRule.js
│   │   │   └── index.js
│   │   │
│   │   ├── routes/                  # Express routers
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── serviceRoutes.js
│   │   │   └── index.js
│   │   │
│   │   ├── middleware/              # Auth, error, validation, rate-limit
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   ├── validate.js
│   │   │   └── upload.js
│   │   │
│   │   ├── services/                # Business logic (pricing, OTP, email)
│   │   │   ├── pricingService.js
│   │   │   ├── otpService.js
│   │   │   ├── emailService.js
│   │   │   └── paymentService.js
│   │   │
│   │   ├── utils/                   # Pure helpers (logger, asyncHandler, etc.)
│   │   │   ├── logger.js
│   │   │   ├── asyncHandler.js
│   │   │   └── ApiError.js
│   │   │
│   │   ├── sockets/                 # Real-time communication
│   │   │   └── socketServer.js
│   │   │
│   │   ├── validators/              # Joi/Zod request schemas
│   │   │
│   │   ├── constants/               # Server-side enums & messages
│   │   │
│   │   ├── app.js                   # Express app setup
│   │   └── server.js                # HTTP + Socket.IO bootstrap
│   │
│   ├── uploads/                     # Local file storage (gitignored)
│   ├── .env
│   ├── .env.example
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── docs/
│   ├── api-documentation.md
│   ├── database-schema.md
│   ├── deployment-guide.md
│   └── architecture.md
│
├── .gitignore
├── .editorconfig
├── docker-compose.yml
├── package.json                     # Root workspace (concurrently scripts)
├── README.md
└── Prompt.md
 

# Project Overview
PrintHub is an online document printing platform where users can upload documents, customize printing specifications, calculate pricing in real time, place orders, and track order status. Administrators can manage users, services, pricing, and print orders from a centralized dashboard.

# User Features
## Home Page Design
Design a responsive homepage using the provided **Printhub\_logo.png**.
- Navigation Bar
  - Top Navigation Bar (Fixed at the top of the page) Store location Button,FAQ Us Button & Track Order Button
  - Logo with a clickable link to the homepage.
  - Navigation links to other pages like "About Us," "Contact Us," and "Services."
  - Sign Up/Sign In buttons on the right side of the bar.
  - Cart icon with a badge to display the number of items in the cart. 
  - Clickable to navigate to the Cart Page.
  - Dropdown menu for users to access the user's profile, order history, and settings.
- Hero Section
  - Search bar with a placeholder "What would you like to print?"
  - Search button to trigger the search action.
- Normal Print Section: Drag and Drop Document Upload Feature with Configurator
- Service Cards
  - Display popular printing services with images and descriptions.
  - Clickable to navigate to service details pages.
  - Display service images and descriptions card as per the design requirements set by admin.
- About Us Section
  - Display information about the company, its history, and its values.
  - Include a contact form for users to get in touch. 
  - Display social media links for users to follow us.
- How It Works Section
  - Display a step-by-step guide on how to use the platform.
  - Include screenshots or GIFs to illustrate the process.
  - Provide clear instructions for each step user from upload to payment.
  - User-friendly interface for ease of use.
- Footer Section
  - Display company information, contact details, legal notices, and social media links.
  - play store link.
  - app store link.
  - Include a copyright notice.

## Authentication Modal (Sign Up/Sign In)
- Create a clean modern modal-based authentication system.
 Features:
  - Sign Up Form ( Mobile Number/Username, Password, Password, Sign Up Button )
   - Sign Up User Type Selection dropdown ( Regular, Student & Institute )
  - Sign In Form ( Mobile Number/Username, Password, Remember Me, Forgot Password Button )
  - Forgot Password Form ( Mobile Number/Username Reset Password Button ) with OTP Verification
  - Google Login Option
   - Clickable to login with Google account.
   - Integrated with Google OAuth API.
   - Automatically logs in users after successful login.
   - After successful Sign Up, show the pop to add mobile number.
  - Password Reset Form ( New Password, Confirm Password, Reset Password Button )
 Requirements:
  - Use printHub logo in the modal.
  - Modal should be responsive and adapt to different screen sizes.
  - Make tabs for Sign Up and Sign In forms.
  - Users can register and login without running the backend.
  - OTP verification should use randomly generated mock OTPs until backend integration is added.
  - Make proper scrolling for mobile devices to ensure a smooth user experience.

## User Profile Dashboard
- Display user information, order history, and settings.
- Saved Addresses (Display saved addresses for quick checkout)
- Allow users to update their profile information.
- Provide options to change their password.
- Enable users to view and manage their orders.

## Normal Print Page (Document Upload & Specifications)
 - Allow users to upload documents for printing.
 - Drag and Drop Document Upload Feature
 - Select document file types (jpg, jpeg, png, pdf, DOC, DOCX, PPT, PPTX)
 - Allow users to upload multiple documents at once.
 - Display file size limit (e.g.,500MB)
 - Live Preview of uploaded documents with supported file types (jpg, jpeg, png, pdf, DOC, DOCX, PPT, PPTX)
 - Paper Size
 - Paper Type
 - Page Range
 - Page Orientation (Optional)
 - Pages Per Sheet
 - Number of Copies
 - Lamination
 - Binding Type (None, Spiral & Stapled)
 - Single Side Printing
 - Double Side Printing
 - Black & White Printing
 - Color Printing
- Calculate real-time pricing based on the selected specifications (INR).
- Enable users to place orders.

## Services Grid Page
- Display a grid of available printing services with images and descriptions.
- Clickable to navigate to service details pages.
- Pagination for large lists.
- Search feature to find specific services.

## Service details pages (Advanced Printing Section)
- Display detailed information about each printing service.

## Advanced Printing Page (Document Upload & Specifications)
- Display detailed information about each printing service (Available Papers Types, Available Document Sizes, Available Pricing & Overview ).
- Allow users to upload documents for printing.
- Drag and Drop Document Upload Feature
- Select document file types (jpg, jpeg, png, pdf, DOC, DOCX, PPT, PPTX, CDR, AI & PS)
- Allow users to upload multiple documents at once.
- Display file size limit (e.g.,500MB)
- Live Preview of uploaded documents with supported file types (jpg, jpeg, png, pdf, DOC, DOCX, PPT, PPTX, CDR, AI & PS)
- Provide a form to input printing specifications as per service details page set by admin user.
  - Paper Size
  - Paper Type
  - Pages Per Sheet
  - Number of Copies
  - Lamination
  - Binding Type (None, Spiral & Stapled)
  - Single Side Printing
  - Double Side Printing
  - Black & White Printing
  - Color Printing
  - Allow admin user to manage the fields as per service details page set by admin user.
  - Clickable to navigate to the Cart & Checkout Page.
- Calculate real-time pricing based on the selected specifications (INR).
- Enable users to place orders.
- Display a success message after the order is placed.

## Payment Gateway Integration
- Integrate a secure payment gateway (e.g., Stripe, Razorpay, or PayPal) to process payments for orders with INR currency.
- Enable users to pay for orders using credit cards, debit cards, or online payment methods.
- Display a success message after the payment is processed.

## Pricing Calculator Page
- Display real-time pricing based on the selected services and specifications (INR).

## Cart Page
- Display the items in the cart, including document details, specifications, and total price (INR).
- Allow users to update the quantity of items in the cart.
- Allow users to View file & Edit the specifications of items from the cart page.
- Provide users with a clear total price (INR) for the items in the cart.
- Enable users to remove items from the cart.
- Clickable to navigate to the Checkout Page.

## Checkout Page
- Display the items in the cart, including document details, specifications, and total price (INR).
- Two-step checkout process:
 - Pick Up from Store location Button ( Optional Time Slot , Date Selection & Store Location Selection)
 - Delivery Address Form (Include fields like Name, Address, City, State, Zip Code, and Phone Number).
- Clickable to place the order.
- Display a success message after the order is placed.

## Order Management
- Display a list of all orders, including order details, user information, and payment status.
- Allow admin to view order details, including document details, specifications, and total price (INR).
- Enable admin to manage orders, including updating order status, processing payments, and canceling orders.
- Display a success message after the order status is updated or the payment is processed.
- Search feature to find specific orders.
- Sorting feature to sort orders by order ID, user ID, or payment status.
- Pagination for large lists.
- Display a summary of total orders, total users, and total revenue (INR).
- Update the summary in real-time as orders are processed.

## Invoice Generation
- Generate PDF invoices for each order, including order details, user information, and total price (INR).
- Allow users to download invoices from the order details page.
- Display a success message after the invoice is generated.
- Display a success message after the invoice is downloaded.


# Admin Dashboard Overview

## Admin Dashboard Page
- Provide a login page for admin users to access the dashboard.
- Display a success message after the admin user logs in.
- Display a success message after the admin user logs out.
- Display the current admin user's information in the dashboard header.
- Add a navigation menu & logout button in the dashboard header.
- Add links to navigate to the following pages:
  - Dashboard Page
  - User Management
  - Order Management
  - Normal Print Management
  - Service Management
  - Service Price Management
  - Paper Size Management
  - Paper Type Management
  - Binding Type Management
  - Lamination Management

## Admin Management

  1. **Admin Account Lifecycle Management**: 
     - Enable super admin users to create, delete, and modify admin user accounts with full CRUD (Create, Read, Update, Delete) capabilities 
     - Implement  feature that allows super admins to delete admin account.

  2. **Detailed Admin Information Visibility**: 
     - Develop a centralized dashboard for super admins  to view complete profiles of all admin users, including: 
       - Full registration metadata (account creation timestamp, IP address at registration, verification status, and original registration source) 
       - Comprehensive login history (all login timestamps, IP addresses, device/browser information, failed login attempts, and session duration logs) 
       - Admin-specific order history (all orders processed by the admin, order IDs, transaction timestamps, and action taken on each order) 
  
  3. **Dynamic Customization and Privilege Control**: 
     - Implement a granular privilege assignment system that allows super admins to set, update, and revoke specific access permissions for each admin user, aligned with role-based access control (RBAC) standards 
     - Add privilege inheritance logic to streamline role assignment, while allowing custom overrides for individual admin accounts 

  4. **User Privilege Management**:
   - Custom Role Model (Su[er Admin User]): 
   - Role List: View all existing roles.
   - Create Role: A form to define a new role.
   - Name: Generates the internal role ID (e.g., "Marketing").
   - Description: A brief summary of the role.
   - Privilege Grid: A checklist grid mapped over all available permission modules to define the default permissions for this new role (e.g. `orders: ['view', 'edit']`). 
   - Updating the Admin Form: The "Add Admin" modal will be updated to accept the dynamic `roles` list via props, ensuring that any newly created roles immediately appear in the Role dropdown when inviting a new team member.
     - In manage role model Enable super admins to assign and manage user privileges for each admin account, with clear visibility into each account's access rights and permissions 
     - Implement a privilege hierarchy system that allows super admins to set up a multi-layered access control structure, with top-level admins having full control over all admin accounts and settings 
     - Add a privilege inheritance feature that allows super admins to set default privileges for new admin accounts, while still allowing individual overrides for each account 
  
  ### Technical and Quality Requirements 
  - Ensure all account modification actions are logged with timestamps and the super admin's user ID for audit trail compliance 
  - Implement input validation and sanitization for all admin account updates to prevent injection attacks and data corruption 
  - Add pagination and search/filter functionality to the admin user list to enable efficient management of large admin user bases 
  - Conduct end-to-end testing to verify all super admin permissions work as intended, including cross-checking that regular admin users cannot access super admin-only management features 
  - Ensure the system maintains data integrity by cascading appropriate actions (such as revoking active sessions) when an admin user's account is deleted or privileges are modified

## Admin User Management
- Display a list of all registered users.
- Allow admin to view user details, including registration information, login history, and order history.
- Enable admin to manage user accounts, including deleting inactive users.
- Super Admin User Management: Allow to add admin users, delete, and update manage by super admin users.
  - Display a list of all super admin users.
  - Allow admin to view super admin details, including registration information, login history, and order history.
  - Enable admin to manage super admin accounts, including deleting inactive super admin users.
  - Add any additional fields as per super admin user details page set by admin user & set user Privileges as per admin user.

## Admin Order Management
- Display a list of all orders, including order details, user information, and payment status.
- Allow admin to view order details, including multiple document details with specifications, and total price (INR).
- Enable admin to manage orders, including updating order status, processing payments, and canceling orders.
  - Order cancellation reason field.
  - Allow admin to cancel the order refund the payment.
- Display a success message after the order status is updated or the payment is processed.
- Search feature to find specific orders.
- Sorting feature to sort orders by order ID, user ID, or payment status.
- Pagination for large lists.
- Display a summary of total orders, total users, and total revenue (INR).
- Update the summary in real-time as orders are processed.
- Display a summary of total orders, total users, and total revenue (INR).
- Update the summary in real-time as orders are processed.
- Invoice Generation Allow Admin to download invoices of the order details in PDF format.

## Admin Normal Print Management
- Allow to Add ,Edit & Delete Price for Normal Print Service.
- Admin user can able to set a price rules (Page Range) as per: 
  - User type ( Regular,Student & Institute).
  - Paper Size.
  - Paper Type.
  - Pages Per Sheet.
  - Number of Copies.
  - Single Side Printing.
  - Double Side Printing.
  - Black & White Printing.
  - Color Printing.

## Admin Service Management
- Display a list of all available printing services, including normal print and advanced printing.
- Allow admin to view service details, including service descriptions, images, and pricing options.
- Enable admin to manage services, including updating service descriptions, images, and pricing options.
- Allow admin to add new services, including normal print and advanced printing.
- Allow admin to delete services, including normal print and advanced printing.
- Allow admin to update service details, including service descriptions, images, and pricing options.
  - As per the service details page, include fields for Paper Size, Paper Type, Pages Per Sheet, Number of Copies, Lamination, Binding Type, Single Side Printing, Double Side Printing, Black & White Printing, Color Printing as per service details page set by admin user.
  - Add any additional fields as per service details page set by admin user.
- Display a success message after the service details are updated.

## Admin Paper Size Management
- Display a list of all paper sizes, including A4, A5, A6, and A7.
- Allow admin to view paper details, including paper sizes.
- Enable admin to manage paper sizes, including updating paper sizes.
- Allow admin to add new paper sizes, including A4, A5, A6, and A7.
- Allow admin to delete paper sizes, including A4, A5, A6, and A7.
- Display a success message after the paper sizes are updated or added.
- Search feature to find specific paper sizes.
- Sorting feature to sort paper sizes by name or size.
- Selection feature to select paper sizes for printing.

## Admin Paper Type Management
- Display a list of all paper types, including White, Color, and Black & White.
- Allow admin to view paper details, including paper types.
- Enable admin to manage paper types, including updating paper types.
- Allow admin to add new paper types, including White, Color, and Black & White.
- Allow admin to delete paper types, including White, Color, and Black & White.
- Display a success message after the paper types are updated or added.
- Search feature to find specific paper types.
- Sorting feature to sort paper types by name or type.
- Selection feature to select paper types for printing.

## Admin Service Price Management
- Display a list of all pricing options, including paper sizes, paper types, binding types, and color options.
- Display separate pricing details for each paper size, paper type, binding type, and color option for normal print.
- Allow admin to view pricing details, including paper sizes, paper types, binding types, and color  as per service details page.
- Enable admin to manage pricing options, including updating pricing for each paper size, paper type, binding type, and color option.

## Admin Binding Management 
- Display a list of all binding types, including None, Spiral, and Stapled.
- Allow admin to view binding details, including binding types.
- Enable admin to manage binding types, including None, Spiral, and Stapled.
- Allow admin to add new binding types, including None, Spiral, and Stapled.
- Allow admin to delete binding types, including None, Spiral, and Stapled.
- Display a success message after the binding types are updated or added.
- Search feature to find specific binding types.
- Sorting feature to sort binding types by name or type.
- Selection feature to select binding types for printing.

## Admin Lamination Management
- Display a list of all lamination types, including None, White, and Black.
- Allow admin to view lamination details, including lamination types.
- Enable admin to manage lamination types, including updating lamination types.
- Allow admin to add new lamination types, including None, White, and Black.
- Allow admin to delete lamination types, including None, White, and Black.
- Display a success message after the lamination types are updated or added.
- Search feature to find specific lamination types.
- Sorting feature to sort lamination types by name or type.
- Selection feature to select lamination types for printing.

# Note
- Responsive design for mobile and desktop devices.
- Loading indicator while loading the page.
- Admin dashboard is accessible only to admin users.
- Admin dashboard is protected with a password.
  - Admin Email: printhub@gmail.com
  - Admin Password: 123456
  - Admin Login URL: http://localhost:5000/adminuser/login
  - Admin Dashboard URL: http://localhost:5000/adminuser/dashboard 
- Link the "Admin" in footer section on user side that rediract to Admin login page. 
- Frontend run "npm run dev" to start the frontend server.
- Backend run "npm run dev" to start the backend server.
- Both the frontend and backend servers should be running to access the application locally npm run dev:server
- The application is accessible at http://localhost:5000.
