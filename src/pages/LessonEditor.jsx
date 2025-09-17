import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createLesson } from "../utils/lessonsApi";

export default function LessonEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(1);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // courseId from URL

  const saveLesson = async () => {
    if (!title.trim() || !content.trim()) return alert("Title and content required!");
    setSaving(true);
    try {
      await createLesson(id, { title, content, order });
      navigate(`/courses/${id}`); // go back to course
    } catch (error) {
      console.error("Error creating lesson:", error);
      alert("Failed to create lesson");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 className="text-primary mb-3">Create Lesson</h2>

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
