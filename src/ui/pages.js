export const loadDashboard = () => import("../Pages/Dashboard");
export const loadAdd = () => import("../Pages/AddTransaction");
export const loadTransactions = () => import("../Pages/Transaction");
export const loadOverview = () => import("../Pages/Overview");
export const loadAnalytics = () => import("../Pages/Analytics");
export const loadProfile = () => import("../Pages/Profile");
export const loadLogin = () => import("../Pages/Login");
export const loadSignUp = () => import("../Pages/SignUp");
export const loadNotFound = () => import("../Pages/NotFound");

export const prefetchByPath = {
  "/": loadDashboard,
  "/AddTransaction": loadAdd,
  "/Transactions": loadTransactions,
  "/Overview": loadOverview,
  "/Analytics": loadAnalytics,
  "/Profile": loadProfile,
  "/Login": loadLogin,
  "/SignUp": loadSignUp,
};
