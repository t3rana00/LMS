import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CourseList from "./pages/CourseList";
import CourseEditor from "./pages/CourseEditor";
import CourseOverview from "./pages/CourseOverview";
import LessonEditor from "./pages/LessonEditor";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return unsub;
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">LMS</Link>
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav ms-auto">
              {!user ? (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
                </>
              ) : (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link text-danger" onClick={logout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 py-4">
        <div className="container">
          <div className="card p-4 shadow-sm">
            <Routes>
              <Route path="/" element={<Navigate to={user ? "/courses" : "/login"} />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/courses" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/courses" />} />

              <Route path="/courses" element={user ? <CourseList /> : <Navigate to="/login" />} />
              <Route path="/courses/new" element={user ? <CourseEditor /> : <Navigate to="/login" />} />
              <Route path="/courses/:id" element={user ? <CourseOverview /> : <Navigate to="/login" />} />
              <Route path="/courses/:id/lessons/new" element={<LessonEditor />} />
<Route path="/courses/:id/lessons/:lessonId/edit" element={<LessonEditor />} />
            </Routes>
          </div>
        </div>
      </main>

      <footer className="text-center py-3 border-top bg-white">
        <small>© {new Date().getFullYear()} LMS — React + Firebase</small>
      </footer>
    </div>
  );
}
