# 💰 Finance Tracking Application

A full-featured **Finance Tracking App** built using the **MERN Stack** that allows users to manage their income and expenses, visualize financial insights through charts, and maintain a personal financial profile with intuitive UI and powerful data handling.

---

## 🚀 Features

### 🔐 Authentication
- User SignUp and Login
- Continue with Google (OAuth)
- Secure authentication with validations

---

### 🧾 Add & Manage Transactions
- Add both **Income** and **Expense**
- Toggle between income/expense form
- Edit and delete existing transactions
- Custom alert method for feedback

---

### 📊 Dashboard Page
- Display **Total Balance**, **Total Income**, and **Total Expenses**
- Shows latest 6 transactions with detail view

---

### 📄 Transactions History Page
- View all user transactions
- Filter by:
  - **Category:** Income / Expense
  - **Date Range:** Start - End date filter

---

### 📁 Add Transactions Page
- Toggle to switch between income and expense input forms
- Input validation for all fields

---

### 🔍 Overview Page
- View **Total Savings**
- Card-based summary of categories with:
  - Category Name
  - Percentage of total
  - Color-coded styling

---

### 📈 Analysis Page
- **Bar Chart**: Yearly transaction data
- **Pie Chart**: Expense by categories
- **Line Chart**: Monthly savings trend
- **Export** analysis as PDF

---

### 👤 Profile Page
- Displays:
  - Profile Image
  - Username
  - Email
- Change:
  - Profile Picture (Uploaded via **Cloudinary**)
  - Username & Email
- Show:
  - Last 4 Transactions
  - Monthly Income & Expense
  - Top Expense Category
- Actions:
  - Logout
  - Delete Account

---

## 🛠️ Tech Stack

### Frontend
- **React JS**
- **Tailwind CSS**
- **Shadcn UI**
- **Reactbits**
- **Magic UI**
- **Ant Design**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**

### Other Tools
- **Cloudinary** for image uploads
- **JWT** for authentication
- **React Context API** / **Redux** (if used) for state management
- **Responsive Design** for all screen sizes

---

## 📦 Installation & Setup

## MoneyMinder interface

The interface uses the CSS custom properties in `src/index.css` as its design tokens (warm background, ink, muted text, income/expense surfaces, chart lavender, and lime accent). Shared UI and page building blocks live in `src/ui/`: `Shell`, `primitives`, `TransactionForm`, `TransactionsView`, and the lazy-loaded analytics charts.

To add a page, create a component in `src/Pages/`, register it with a `React.lazy(() => import(...))` route in `src/App.jsx`, and add its `PageSkeleton` mapping in `src/ui/primitives.jsx`. Add its route title and navigation link in `src/ui/Shell.jsx` when it belongs in the primary navigation. Keep transaction requests and models in the existing store and API layer.

## Google login configuration

Set `GOOGLE_CLIENT_ID` or `VITE_GOOGLE_CLIENT_ID` to the public Google OAuth web client ID; the Vite config maps the unprefixed key without exposing other backend variables. Do not put secrets in `VITE_` variables. In development, requests use same-origin `/api` and the Vite proxy to `http://localhost:4000`. Set `VITE_API_BASE_URL` for the deployed API. The backend must separately allow credentialed requests from the frontend origin and configure its session cookies for its hosting domains.

```bash
# Clone the repository
git clone https://github.com/hshehriyaralam/MoneyMinder.git

# Navigate to project folder
cd MoneyMinder

# Install dependencies
npm install

# Run frontend and backend
npm run dev
```
