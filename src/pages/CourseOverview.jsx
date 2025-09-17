import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourse } from "../utils/lmsApi";
import { listLessons } from "../utils/lessonsApi";
import { useUserRole } from "../hooks/useUserRole";

export default function CourseOverview() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const { userData, loading } = useUserRole();

  useEffect(() => {
    getCourse(id).then(setCourse);
    listLessons(id).then(setLessons);
  }, [id]);

  if (!course) return <p>Loading…</p>;
  if (loading) return <p>Checking role…</p>;

  return (
    <div>
      <h2 className="text-primary mb-2">{course.title}</h2>
      <p className="text-muted">{course.code}</p>
      <p>{course.description}</p>

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
              <strong>{l.order}. {l.title}</strong>
              <p className="mb-0">{l.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
