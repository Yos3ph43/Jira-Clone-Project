import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "features/Login/components/Login";
import Signup from "features/Login/components/Signup";
import ProjectManage from "features/ProjectManage/ProjectManage";
import ProjectDetail from "features/ProjectManage/components/ProjectDetail";
import ProjectList from "features/ProjectManage/components/ProjectList";
import UserProfile from "features/ProjectManage/components/UserProfile";
import Auth from "features/Login/Auth";
import ProjectCreate from "features/ProjectManage/components/ProjectCreate";
import AppRoute from "app/AppRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* login */}
        <Route path="/auth" element={<Auth />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
        {/* home */}
        <Route
          exact
          path="/"
          element={<AppRoute element={ProjectManage} isPrivate />}
        >
          <Route path="/list" element={<ProjectList />} />
          <Route path="/create" element={<ProjectCreate />} />
          <Route path="/detail/:id" element={<ProjectDetail />} />
          <Route path="/user" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
