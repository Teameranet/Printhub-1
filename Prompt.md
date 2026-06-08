# Build PrintHub – Full Stack React +  Printing Management Platform

Create a modern, scalable, production-ready full-stack web application called **PrintHub** using **React JSX (Vite)** for the frontend and a modular backend architecture. Follow the exact project structure provided and maintain clean, reusable, component-based development practices.


### Project Structure

Use the provided frontend/backend folder structure exactly as defined.

---

# Project Overview

PrintHub is an online document printing platform where users can upload documents, customize printing specifications, calculate pricing in real time, place orders, and track order status. Administrators can manage users, services, pricing, and print orders from a centralized dashboard.

---

# User Features

## 1. Home Page

Design a modern SaaS-style homepage using the provided **Printhub_logo.png**.

Include:

### Hero Section

* Multi-language search bar
* Placeholder:
  * "What would you like to print?"

* Language selector:

  * English
  * Hindi
  * Marathi

### Quick Access Cards

#### Normal Print

* Modern service card UI
* Button:

  * "Start Printing"
* Navigate to:

  * /normal-print

#### Advanced Print

* Modern service card UI
* Grid icon
* Button:

  * "See All Printing Services"
* Navigate to:

  * /advanced-print
* Show redesigned "Coming Soon" page

---

## 2. Authentication

Create a clean modern modal-based authentication system.

Features:

* Sign Up
* Sign In
* Forgot Password
* Password Reset

Requirements:

* Users can register and login without running the backend.
* Use Firebase Authentication.
* OTP verification should use randomly generated mock OTPs until backend integration is added.
* Remove all Demo User functionality completely.

---

## 3. User Profile

Create a centralized profile dashboard.

Features:

* Personal Information
* Account Settings
* Saved Addresses
* Saved Payment Methods
* Notification Preferences
* Order Statistics

---

## 4. Normal Print Module

Create a complete document printing workflow.

### Document Upload

Support:

* PDF
* DOC
* DOCX
* PPT
* PPTX

### Live Preview

Display uploaded document preview before checkout.

### Printing Specifications

Allow users to configure:

* Paper Size
* Paper Type
* Pages Per Sheet
* Number of Copies
* Lamination
* Binding Type
* Single Side Printing
* Double Side Printing
* Black & White
* Color Printing

---

## 5. Pricing Calculator Page

Build a real-time pricing engine.

Display:

* Base Printing Cost
* Paper Cost
* Binding Cost
* Lamination Cost
* Additional Charges
* Discounts
* Promotions
* Final Total

### Pages Per Sheet Logic

Implement pricing calculation using:

* 1 Page Per Sheet
* 2 Pages Per Sheet
* 4 Pages Per Sheet
* 6 Pages Per Sheet
* 9 Pages Per Sheet
* 16 Pages Per Sheet

Calculation Rules:

1. Calculate effective sheets:
   effectiveSheets = ceil(totalPages / pagesPerSheet)

2. Base Rates:

   * B&W = ₹2
   * Color = ₹10

3. Double-sided printing:

   * Apply 20% discount

4. Multiply by quantity

5. Include all additional configuration costs

6. Provide fallback calculation if API fails

---

## 6. Cart & Checkout System

Implement separate Cart and Checkout workflows.

### Direct Checkout

When users upload documents and click Continue:

* Only uploaded documents move to checkout.

### Cart Checkout

When users click Print Now from Cart:

* Only cart items move to checkout.

### Requirements

* Prevent automatic cart merging.
* Checkout must only display documents explicitly passed through navigation state.
* If checkout is opened directly without documents:

  * Redirect user to Cart page automatically.

---

## 7. Order History

Create a detailed order management page.

Features:

* Current Orders
* Completed Orders
* Cancelled Orders
* Payment History
* Reorder Functionality
* Advanced Search
* Filters
* Date Range Filtering
* Status Filtering

---

# Advanced Printing Section

Create a redesigned Advanced Printing page.

Display services in a modern grid layout.

Examples:

* Letterhead Printing
* Jumbo Printing
* A3 Printing
* Poster Printing
* Marketing Materials
* Custom Printing

Show:

* Service Card
* Service Description
* Pricing Placeholder
* Coming Soon Badge

Admin should be able to add new services dynamically.

---

# Admin Dashboard

Build a professional SaaS-style admin panel.

Include:

## Dashboard Overview

Show:

* Total Users
* Active Users
* Orders Today
* Revenue
* Pending Orders
* Printing Statistics

---

## User Management

Features:

* User Search
* Advanced Filters
* User Details
* User Status
* Real-Time Updates
* Role Management

---

## Order Management

Admin can:

* View Uploaded Documents
* Open Document Preview
* Print Documents
* Update Order Status
* Track Production Progress
* View User Specifications

Status Examples:

* Pending
* Accepted
* Printing
* Ready
* Cancled
* Completed
* Delivered

Updates should appear in real time.

---

## Normal Printing Price Management

Admin can create and manage pricing based on:

### User Types

* Student
* Regular User
* Business User
* Corporate User

### Pricing Conditions

* Color Type
* Single Side
* Double Side
* Page Range

Examples:

1–50 Pages
51–100 Pages
101–500 Pages
500+ Pages

Real-time pricing must automatically update user calculations.

---

## Binding Management

Admin can:

* Add Binding Types
* Edit Binding Types
* Delete Binding Types

Examples:

* Spiral
* Stapled Binding


Pricing Rules:

* Based on User Type
* Based on Page Range

---

## Paper Management

Admin can:

### Manage Paper Sizes

Examples:

* A4
* A3
* A5
* Letter
* Legal

### Manage Paper Types

Examples:

* Standard
* Premium
* Glossy
* Matte

---

## Service Management

Admin can:

* Add Services
* Edit Services
* Delete Services

Fields:

* Service Name
* Service Type
* Service Description
* Service Price

Mark section as:

* Coming Soon

for future implementation.

---

# Real-Time Pricing System

Store pricing configuration in .

User-side pricing must dynamically fetch:

* Print Cost
* Binding Cost
* Paper Cost
* Lamination Cost
* Service Cost

based on the latest admin configuration.

No hardcoded prices should exist after admin settings are configured.

---

# UI/UX Requirements

Use a premium SaaS-style design system.

### Design Style

* Clean
* Minimal
* Modern
* Professional
* Responsive

### Components

* Animated Cards
* Hover Effects
* Skeleton Loaders
* Modern Forms
* Smooth Transitions
* Toast Notifications

---

# Footer Redesign

Create a modern SaaS footer with:

### Sections

* Company
* Services
* Support
* Legal
* Social Links

### Features

* Animated Icons
* Hover Effects
* Newsletter Subscription
* Copyright
* Modern Layout

Use smooth micro-interactions and premium SaaS aesthetics.

---

# Deliverables

Generate:

1. Complete frontend implementation.
2.  Authentication setup.
3.  database integration.
4.  Storage integration.
5. Complete Admin Dashboard.
6. Real-time pricing engine.
7. Responsive mobile-first design.
8. Clean reusable React JSX components.
9. Role-based access control.
10. Well-documented code with comments.
