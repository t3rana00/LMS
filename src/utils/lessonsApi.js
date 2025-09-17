import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

export async function listLessons(courseId) {
  const snap = await getDocs(
    query(collection(db, "courses", courseId, "lessons"), orderBy("order"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createLesson(courseId, data) {
  return addDoc(collection(db, "courses", courseId, "lessons"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

// ✅ Fetch a single lesson by ID
export async function getLesson(courseId, lessonId) {
  const ref = doc(db, "courses", courseId, "lessons", lessonId);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ✅ Update lesson
export async function updateLesson(courseId, lessonId, data) {
  const ref = doc(db, "courses", courseId, "lessons", lessonId);
  await updateDoc(ref, data);
}

// ✅ Delete lesson
export async function deleteLesson(courseId, lessonId) {
  const ref = doc(db, "courses", courseId, "lessons", lessonId);
  await deleteDoc(ref);
}
