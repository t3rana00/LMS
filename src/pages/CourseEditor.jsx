import { useState } from "react";
import { createCourse } from "../utils/lmsApi";
import { useNavigate } from "react-router-dom";

export default function CourseEditor() {
  const [title,setTitle]=useState(""); const [code,setCode]=useState(""); const [description,setDescription]=useState("");
  const [saving,setSaving]=useState(false); const navigate=useNavigate();

  const save = async () => {
    if(!title.trim()||!code.trim()) return;
    setSaving(true);
    try { const ref = await createCourse({ title, code, description }); navigate(`/courses/${ref.id}`); }
    finally { setSaving(false); }
  };

  return (
    <div style={{maxWidth:600}}>
      <h2 className="text-primary mb-3">Create Course</h2>
      <label className="form-label">Title</label>
      <input className="form-control mb-2" value={title} onChange={e=>setTitle(e.target.value)} />
      <label className="form-label">Code</label>
      <input className="form-control mb-2" value={code} onChange={e=>setCode(e.target.value)} />
      <label className="form-label">Description</label>
      <textarea className="form-control mb-3" rows="4" value={description} onChange={e=>setDescription(e.target.value)} />
      <button className="btn btn-primary" onClick={save} disabled={saving}>
        {saving ? "Saving…" : "Save Course"}
      </button>
    </div>
  );
}
