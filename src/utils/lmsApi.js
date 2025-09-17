import { db, auth } from "../firebase";
import {
  collection, doc, addDoc, getDoc, getDocs,
  setDoc, query, where, orderBy, serverTimestamp
} from "firebase/firestore";

export async function listCourses() {
  const snap = await getDocs(query(collection(db,"courses"), orderBy("createdAt","desc")));
  return snap.docs.map(d => ({ id:d.id, ...d.data() }));
}

export async function createCourse(data) {
  const uid = auth.currentUser?.uid;
  return addDoc(collection(db,"courses"), {
    ...data, teacherId: uid, createdAt: serverTimestamp()
  });
}

export async function getCourse(id) {
  const d = await getDoc(doc(db,"courses",id));
  return d.exists() ? { id:d.id, ...d.data() } : null;
}

export async function enroll(courseId) {
  const uid = auth.currentUser?.uid;
  return addDoc(collection(db, "enrollments"), {
    courseId, studentId: uid, enrolledAt: serverTimestamp()
  });
}

export async function listLessons(courseId) {
  const snap = await getDocs(
    query(collection(db, "courses", courseId, "lessons"), orderBy("order"))
  );
  return snap.docs.map(d => ({ id:d.id, ...d.data() }));
}
