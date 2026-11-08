import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollTop from "./Components/comman/ScrollTop";
import { RouteBoundary, RouteFallback, Shell } from "./ui/Shell";

const Dashboard = lazy(() => import("./Pages/Dashboard"));
const AddTransaction = lazy(() => import("./Pages/AddTransaction"));
const Analytics = lazy(() => import("./Pages/Analytics"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Transaction = lazy(() => import("./Pages/Transaction"));
const Overview = lazy(() => import("./Pages/Overview"));
const Profile = lazy(() => import("./Pages/Profile"));
const Login = lazy(() => import("./Pages/Login"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const ProtectedLayout = lazy(() => import("./Components/layout/ProtectedLayout"));

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Shell>
        <RouteBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route element={<ProtectedLayout />}>
                <Route path="/AddTransaction" element={<AddTransaction />} />
              </Route>
              <Route path="/Transactions" element={<Transaction />} />
              <Route path="/Analytics" element={<Analytics />} />
              <Route path="/Overview" element={<Overview />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RouteBoundary>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
