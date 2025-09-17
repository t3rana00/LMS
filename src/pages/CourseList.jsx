import { useEffect, useState } from "react";
import { listCourses } from "../utils/lmsApi";
import { Link } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData, loading: roleLoading } = useUserRole();

  useEffect(() => {
    listCourses().then(setCourses).finally(() => setLoading(false));
  }, []);

  if (loading || roleLoading) return <p>Loading courses...</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary mb-0">📚 Courses</h2>
        {/* ✅ Show create button only if teacher */}
        {userData?.role === "teacher" && (
          <Link className="btn btn-primary" to="/courses/new">
            + New Course
          </Link>
        )}
      </div>

      {courses.length === 0 ? (
        <p>No courses yet.</p>
      ) : (
        <div className="row">
          {courses.map((c) => (
            <div key={c.id} className="col-md-6 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{c.title}</h5>
                  <p className="text-muted">{c.code}</p>
                  <p>{c.description}</p>
                  <Link className="btn btn-outline-primary" to={`/courses/${c.id}`}>
                    Open
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
