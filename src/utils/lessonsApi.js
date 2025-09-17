import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
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
