import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCourse } from "../utils/lmsApi";
import { listLessons, deleteLesson } from "../utils/lessonsApi";
import { useUserRole } from "../hooks/useUserRole";

export default function CourseOverview() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const { userData, loading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    getCourse(id).then(setCourse);
    listLessons(id).then(setLessons);
  }, [id]);

  const handleDelete = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    await deleteLesson(id, lessonId);
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
  };

  if (!course) return <p>Loading course…</p>;
  if (loading) return <p>Checking user role…</p>;

  return (
    <div>
      {/* ✅ Back Button */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate("/courses")}
      >
        ← Back to Courses
      </button>

      {/* Course Info */}
      <h2 className="text-primary mb-2">{course.title}</h2>
      <p className="text-muted">{course.code}</p>
      <p>{course.description}</p>

      {/* Lessons Section */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>📖 Lessons</h5>
        {userData?.role === "teacher" && (
          <Link className="btn btn-outline-primary btn-sm" to={`/courses/${id}/lessons/new`}>
            + Add Lesson
          </Link>
        )}
      </div>

      {lessons.length === 0 ? (
        <p>No lessons yet.</p>
      ) : (
        <ul className="list-group">
          {lessons.map((l) => (
            <li key={l.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <strong>{l.order}. {l.title}</strong>
                  <p className="mb-0">{l.content}</p>
                </div>
                {userData?.role === "teacher" && (
                  <div className="btn-group btn-group-sm">
                    <Link
                      className="btn btn-outline-secondary"
                      to={`/courses/${id}/lessons/${l.id}/edit`}
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(l.id)}
                    >
                      🗑
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
