import { useState, useEffect } from "react";
import { createCourse } from "../utils/lmsApi";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";

export default function CourseEditor() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { userData, loading } = useUserRole();

  // ✅ Check user role — redirect if not teacher
  useEffect(() => {
    if (!loading && userData?.role !== "teacher") {
      alert("🚫 You must be a teacher to create courses.");
      navigate("/courses");
    }
  }, [userData, loading, navigate]);

  const save = async () => {
    if (!title.trim() || !code.trim()) return;
    setSaving(true);
    try {
      const ref = await createCourse({
        title,
        code,
        description,
      });
      navigate(`/courses/${ref.id}`);
    } catch (error) {
      console.error("Error creating course:", error);
      alert("❌ Failed to create course. Check console.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Checking permissions...</p>;

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 className="text-primary mb-3">Create Course</h2>

      <label className="form-label">Title</label>
      <input
        className="form-control mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label className="form-label">Code</label>
      <input
        className="form-control mb-2"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />

      <label className="form-label">Description</label>
      <textarea
        className="form-control mb-3"
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={save}
        disabled={saving}
      >
        {saving ? "Saving…" : "Save Course"}
      </button>
    </div>
  );
}
