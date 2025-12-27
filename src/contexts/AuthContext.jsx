import { createContext, useContext, useEffect, useState, useRef } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../lib/firebase";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // OPTIMISTIC INIT: Load from localStorage if available
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('drivehire_user');
            return saved ? JSON.parse(saved) : null;
        } catch { return null; }
    });

    const [userRole, setUserRole] = useState(() => {
        try {
            const saved = localStorage.getItem('drivehire_role');
            return saved ? JSON.parse(saved) : null;
        } catch { return 'customer'; }
    });

    // If we have a cached user, we are NOT loading (conceptually)
    const [loading, setLoading] = useState(() => !localStorage.getItem('drivehire_user'));
    const registeringRole = useRef(null);

    // Sync state to localStorage
    useEffect(() => {
        if (user) localStorage.setItem('drivehire_user', JSON.stringify(user));
        else localStorage.removeItem('drivehire_user');
    }, [user]);

    useEffect(() => {
        if (userRole) localStorage.setItem('drivehire_role', JSON.stringify(userRole));
        else localStorage.removeItem('drivehire_role');
    }, [userRole]);

    useEffect(() => {
        setPersistence(auth, browserLocalPersistence);

        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                setUser(null);
                setUserRole(null);
                setLoading(false);
                return;
            }

            try {
                const snap = await getDoc(doc(db, "users", currentUser.uid));

                if (snap.exists()) {
                    const data = snap.data();
                    console.log("AuthContext: Firestore data loaded", data);
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        ...data,
                    });
                    setUserRole(data.role);
                } else {
                    console.warn("AuthContext: User doc missing in Firestore. Existing role:", userRole);
                    setUser(currentUser);
                    // Use the registering role if available, or try to keep existing role if we have one cached
                    // Only default to customer if we truly have nothing
                    setUserRole(prev => registeringRole.current || prev || "customer");
                    if (registeringRole.current) console.log("AuthContext: Using pending role", registeringRole.current);
                }
            } catch (err) {
                console.error("AuthContext: Error fetching user doc", err);
                setUser(currentUser);
                // Keep existing role on error instead of forcing customer
                setUserRole(prev => registeringRole.current || prev || "customer");
            }

            setLoading(false);
        });

        return () => unsub();
    }, []);

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const register = async (email, password, role, extra = {}) => {
        registeringRole.current = role;
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const userData = {
            email,
            role,
            createdAt: new Date(),
            ...extra,
        };
        await setDoc(doc(db, "users", res.user.uid), userData);

        // Manual state update to prevent race condition with onAuthStateChanged
        setUser({
            uid: res.user.uid,
            email: res.user.email,
            displayName: extra.fullName,
            ...userData
        });
        setUserRole(role);
    };

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
    };

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider
            value={{ user, userRole, loading, login, register, loginWithGoogle, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
