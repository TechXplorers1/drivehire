import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../lib/firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null); // 'customer', 'driver', 'instructor', 'admin'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => console.log("AuthContext: Persistence set to local"))
            .catch((error) => console.error("AuthContext: Failed to set persistence", error));

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // IMMEDIATE UPDATE: Set basic user info so UI updates instantly
                setUser(currentUser);

                // Fetch user role/profile from Firestore
                try {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        console.log("AuthContext: User loaded from Firestore", userData);
                        // Safely merge: prioritize Firestore data but ensure Auth properties exist
                        setUser({
                            uid: currentUser.uid,
                            email: currentUser.email,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                            ...userData
                        });
                        setUserRole(userData.role || 'customer');
                    } else {
                        // New user (partially initialized)
                        // setUser(currentUser); // Already set above
                        setUserRole(null);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    // Fallback for offline/error state: still allow login but maybe with restricted access or default role
                    console.log("AuthContext: Fallback user set", currentUser);
                    // Ensure basic props are available even if fallback
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        ...currentUser
                    });
                    setUserRole('customer'); // Default role fallback
                }
            } else {
                console.log("AuthContext: User is null (logged out)");
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        // Safety timeout to prevent indefinite loading
        const timer = setTimeout(() => {
            if (loading) {
                console.warn("Auth state change timed out, forcing app load.");
                setLoading(false);
            }
        }, 5000); // 5 seconds timeout

        return () => {
            unsubscribe();
            clearTimeout(timer);
        };
    }, []);

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    const register = async (email, password, role = 'customer', additionalData = {}) => {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const uid = res.user.uid;
        // Create user document
        await setDoc(doc(db, "users", uid), {
            email,
            role,
            createdAt: new Date(),
            ...additionalData
        });
        return res;
    };

    const loginWithGoogle = async (role = 'customer') => {
        const res = await signInWithPopup(auth, googleProvider);
        // Check if user doc exists, if not create it
        const userDocRef = doc(db, "users", res.user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                email: res.user.email,
                role,
                createdAt: new Date(),
            });
        }
        return res;
    }

    const logout = () => signOut(auth);

    const value = {
        user,
        userRole,
        login,
        register,
        loginWithGoogle,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <div>Loading Authentication...</div> : children}
        </AuthContext.Provider>
    );
};
