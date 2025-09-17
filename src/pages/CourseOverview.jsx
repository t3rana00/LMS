import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse, enroll, listLessons } from "../utils/lmsApi";

export default function CourseOverview() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    getCourse(id).then(setCourse);
    listLessons(id).then(setLessons);
  }, [id]);

  if (!course) return <p>Loading…</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="text-primary mb-0">{course.title}</h2>
        <button className="btn btn-success" onClick={() => enroll(id)}>Enroll</button>
      </div>
      <p className="text-muted">{course.code}</p>
      <p>{course.description}</p>

      <h5 className="mt-4">Lessons</h5>
      {lessons.length === 0 ? <p>No lessons yet.</p> : (
        <ul className="list-group">
          {lessons.map(l => <li key={l.id} className="list-group-item">{l.order}. {l.title}</li>)}
        </ul>
      )}
    </div>
  );
}
