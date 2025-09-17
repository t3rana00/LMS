import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [err,setErr]=useState("");

  const onSubmit = async (e) => {
    e.preventDefault(); setErr("");
    try { await signInWithEmailAndPassword(auth, email, password); }
    catch (e) { setErr("Invalid email or password."); }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto" style={{maxWidth:420}}>
      <h3 className="mb-3">Login</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn btn-primary w-100">Login</button>
    </form>
  );
}
