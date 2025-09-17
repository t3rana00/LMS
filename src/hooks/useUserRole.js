import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export function useUserRole() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (snap.exists()) setUserData(snap.data());
        else setUserData(null);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserData(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, [auth.currentUser]);

  return { userData, loading };
}
