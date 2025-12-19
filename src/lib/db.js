import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    doc,
    getDoc,
    serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";

// DRIVERS
export const getDrivers = async (city) => {
    let q = collection(db, "drivers");
    if (city) {
        q = query(q, where("city", "==", city));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getDriverById = async (id) => {
    const docRef = doc(db, "drivers", id);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

// INSTRUCTORS
export const getInstructors = async (filters = {}) => {
    let q = collection(db, "instructors");
    // Simple filtering (can be expanded)
    if (filters.transmission) {
        q = query(q, where("transmission", "==", filters.transmission));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// VEHICLES
export const getVehicles = async (type) => {
    let q = collection(db, "vehicles");
    if (type) {
        q = query(q, where("type", "==", type));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// BOOKINGS
export const createBooking = async (bookingData) => {
    return await addDoc(collection(db, "bookings"), {
        ...bookingData,
        createdAt: serverTimestamp(),
        status: 'pending',
        paymentStatus: 'pending'
    });
};

export const getUserBookings = async (userId) => {
    const q = query(collection(db, "bookings"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// LESSONS & PACKAGES
export const getLessons = async () => {
    const snapshot = await getDocs(collection(db, "lessons"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getLessonPackages = async () => {
    const snapshot = await getDocs(collection(db, "lessonPackages"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
