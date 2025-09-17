import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createLesson, getLesson, updateLesson } from "../utils/lessonsApi";

export default function LessonEditor() {
  const { id: courseId, lessonId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!lessonId) return;
    setLoading(true);
    getLesson(courseId, lessonId)
      .then((l) => {
        if (l) {
          setTitle(l.title);
          setContent(l.content);
          setOrder(l.order);
        }
      })
      .finally(() => setLoading(false));
  }, [courseId, lessonId]);

  const saveLesson = async () => {
    if (!title.trim() || !content.trim()) return alert("Title and content required!");
    setSaving(true);
    try {
      if (lessonId) {
        await updateLesson(courseId, lessonId, { title, content, order });
      } else {
        await createLesson(courseId, { title, content, order });
      }
      navigate(`/courses/${courseId}`);
    } catch (error) {
      console.error("Error saving lesson:", error);
      alert("Failed to save lesson");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading lesson...</p>;

  return (
    <div style={{ maxWidth: 600 }}>
      {/* ✅ Back button */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate(`/courses/${courseId}`)}
      >
        ← Back to Course
      </button>

      <h2 className="text-primary mb-3">
        {lessonId ? "Edit Lesson" : "Create Lesson"}
      </h2>

      <label className="form-label">Title</label>
      <input
        className="form-control mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="form-label">Lesson Order</label>
      <input
        className="form-control mb-2"
        type="number"
        value={order}
        onChange={(e) => setOrder(Number(e.target.value))}
      />

      <label className="form-label">Content</label>
      <textarea
        className="form-control mb-3"
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="btn btn-primary" onClick={saveLesson} disabled={saving}>
        {saving ? "Saving…" : "Save Lesson"}
      </button>
    </div>
  );
}
