import { createContext, useContext, useEffect, useState } from "react";
// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   signInWithPopup,
//   setPersistence,
//   browserLocalPersistence,
// } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { auth, db, googleProvider } from "../lib/firebase";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // MOCK: Load from local storage to simulate persistence
  useEffect(() => {
    const storedUser = localStorage.getItem('drivehire_mock_user');
    const storedRole = localStorage.getItem('drivehire_mock_role');

    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setUserRole(storedRole);
    }
    setLoading(false);
  }, []);

  /* 
  // ORIGINAL FIREBASE LOGIC
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setUserRole(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          // Safety fallback – SHOULD NOT happen normally
          await setDoc(ref, {
            email: currentUser.email,
            role: "customer",
            createdAt: new Date(),
          });
          setUserRole("customer");
        } else {
          setUserRole(snap.data().role);
        }

        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
        });
      } catch (error) {
        console.error("Auth error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);
  */

  // MOCK LOGIN
  const login = async (email, password) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (password !== "12345@Tx") {
      throw new Error("Invalid password (Mock: Use '12345@Tx')");
    }

    let role = "customer";
    let uid = "mock-user-1";

    if (email === "user@gmail.com") {
      role = "customer";
      uid = "mock-user-123";
    } else if (email === "driver@gmail.com") {
      role = "driver";
      uid = "mock-driver-456";
    } else {
      throw new Error("User not found (Mock: Use 'user@gmail.com' or 'driver@gmail.com')");
    }

    const mockUser = { uid, email };

    setUser(mockUser);
    setUserRole(role);

    // Persist
    localStorage.setItem('drivehire_mock_user', JSON.stringify(mockUser));
    localStorage.setItem('drivehire_mock_role', role);
  };

  /*
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  */

  // MOCK REGISTER
  const register = async (email, password, role, extra = {}) => {
    throw new Error("Registration disabled in Mock Mode. Please use 'user@gmail.com' or 'driver@gmail.com' to login.");
  };

  /*
  const register = async (email, password, role, extra = {}) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      email,
      role,
      createdAt: new Date(),
      ...extra,
    });

    return res;
  };
  */

  // MOCK GOOGLE LOGIN
  const loginWithGoogle = async (role = "customer") => {
    // Treat as standard customer login
    await login("user@gmail.com", "12345@Tx");
  };

  /*
  const loginWithGoogle = async (role = "customer") => {
    const res = await signInWithPopup(auth, googleProvider);
    const ref = doc(db, "users", res.user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        email: res.user.email,
        role,
        createdAt: new Date(),
      });
    }

    return res;
  };
  */

  // MOCK LOGOUT
  const logout = async () => {
    setUser(null);
    setUserRole(null);
    localStorage.removeItem('drivehire_mock_user');
    localStorage.removeItem('drivehire_mock_role');
  };

  /*
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserRole(null);
  };
  */

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};
