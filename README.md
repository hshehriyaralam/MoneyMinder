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

```bash
# Clone the repository
git clone https://github.com/hshehriyaralam/MoneyMinder.git

# Navigate to project folder
cd MoneyMinder

# Install dependencies
npm install

# Run frontend and backend
npm run dev
