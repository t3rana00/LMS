import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Signup() {
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [err,setErr]=useState(""); const [ok,setOk]=useState("");

  const onSubmit = async (e) => {
    e.preventDefault(); setErr(""); setOk("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), { name, email, role: "student" });
      setOk("Account created! You can log in now.");
      setName(""); setEmail(""); setPassword("");
    } catch (e) { setErr(e.message); }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto" style={{maxWidth:420}}>
      <h3 className="mb-3">Sign Up</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      {ok && <div className="alert alert-success">{ok}</div>}
      <input className="form-control mb-2" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="form-control mb-2" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="form-control mb-3" type="password" placeholder="Password (min 6 chars)" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn btn-primary w-100">Create Account</button>
    </form>
  );
}
