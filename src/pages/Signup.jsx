import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // ✅ default is student
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");
    try {
      // Create Firebase Auth user
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // Store user profile with role in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        email,
        role, // ✅ store teacher/student role
      });

      setOk("✅ Account created! You can log in now.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto" style={{ maxWidth: 420 }}>
      <h3 className="mb-3 text-center">Sign Up</h3>

      {err && <div className="alert alert-danger">{err}</div>}
      {ok && <div className="alert alert-success">{ok}</div>}

      <input
        className="form-control mb-2"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="form-control mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* ✅ Role selection */}
      <label className="form-label">Select Role</label>
      <select
        className="form-select mb-3"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">👨‍🎓 Student</option>
        <option value="teacher">👩‍🏫 Teacher</option>
      </select>

      <button className="btn btn-primary w-100">Create Account</button>
    </form>
  );
}
