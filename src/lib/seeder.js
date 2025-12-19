import { collection, addDoc, writeBatch, doc } from "firebase/firestore";
import { db, auth } from "./firebase";

// Sample Data
const drivers = [
    {
        fullName: "John Doe",
        email: "john.driver@example.com",
        phone: "555-0101",
        city: "New York",
        rating: 4.8,
        reviews: 120,
        bio: "Professional chauffeur with 10 years experience.",
        hourlyRate: 50,
        vehicleTypes: ["luxury", "suv"],
        availability: { mon: ["09:00", "17:00"], tue: ["09:00", "17:00"] }, // Simplified
        imageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        fullName: "Jane Smith",
        email: "jane.driver@example.com",
        phone: "555-0102",
        city: "New York",
        rating: 4.9,
        reviews: 85,
        bio: "Reliable and safe driver, specialized in airport transfers.",
        hourlyRate: 45,
        vehicleTypes: ["sedan", "suv"],
        availability: { mon: ["08:00", "16:00"], wed: ["08:00", "16:00"] },
        imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        fullName: "Mike Brown",
        email: "mike.driver@example.com",
        phone: "555-0103",
        city: "Los Angeles",
        rating: 4.7,
        reviews: 40,
        bio: "Friendly local driver who knows all the shortcuts.",
        hourlyRate: 40,
        vehicleTypes: ["sedan"],
        availability: { fri: ["12:00", "20:00"] },
        imageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
    }
];

const vehicles = [
    {
        make: "Mercedes-Benz",
        model: "S-Class",
        year: 2023,
        plate: "LUX-001",
        type: "luxury",
        capacity: 4,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/2018_Mercedes-Benz_S560_AMG_Line_Premium_4.0_Front.jpg"
    },
    {
        make: "Cadillac",
        model: "Escalade",
        year: 2022,
        plate: "SUV-999",
        type: "suv",
        capacity: 6,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/2015_Cadillac_Escalade_ESV_Premium_--_08-27-2014.jpg"
    },
    {
        make: "Toyota",
        model: "Camry",
        year: 2022,
        plate: "Eco-555",
        type: "sedan",
        capacity: 4,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg"
    }
];

const instructors = [
    {
        fullName: "Sarah Connor",
        email: "sarah.teach@example.com",
        city: "New York",
        rating: 5.0,
        reviews: 210,
        bio: "Maximize your chances of passing first time. 15 years experience. Patient and clear.",
        hourlyRate: 65,
        car: "Volkswagen Golf (Dual Control)",
        transmission: "Manual",
        languages: ["English", "Spanish"],
        passRate: "98%",
        imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        fullName: "David Chen",
        email: "david.teach@example.com",
        city: "New York",
        rating: 4.9,
        reviews: 150,
        bio: "Specialist in nervous drivers. Calm environment guaranteed.",
        hourlyRate: 70,
        car: "Toyota Prius (Dual Control)",
        transmission: "Automatic",
        languages: ["English", "Mandarin"],
        passRate: "95%",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        fullName: "Emily Blunt",
        email: "emily.teach@example.com",
        city: "Brooklyn",
        rating: 4.8,
        reviews: 90,
        bio: "Friendly and efficient. I'll get you road-ready in no time.",
        hourlyRate: 60,
        car: "Mini Cooper (Dual Control)",
        transmission: "Manual",
        languages: ["English"],
        passRate: "92%",
        imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
    }
];

const lessonPackages = [
    {
        title: "The Starter Pack",
        hours: 5,
        price: 325, // $65/hr
        discount: "Save $25",
        features: ["Basic Controls", "Turning & Intersections", "Online Theory Support"]
    },
    {
        title: "Test Ready Intensive",
        hours: 10,
        price: 600, // $60/hr
        discount: "Save $100",
        features: ["All Maneuvers", "Mock Tests", "Highway Driving", "Priority Booking"],
        popular: true
    },
    {
        title: "Complete Driver",
        hours: 20,
        price: 1100, // $55/hr
        discount: "Save $300",
        features: ["Zero to Hero", "Defensive Driving", "Night Driving", "Unlimited Theory Support"]
    }
];

// Keep existing basic lessons if needed, or replace. 
// We will keep 'lessons' variable as is for backward compat or just ignore it.

export const seedDatabase = async () => {
    try {
        const batch = writeBatch(db);

        // Drivers
        drivers.forEach((d) => {
            const ref = doc(collection(db, "drivers"));
            batch.set(ref, d);
        });

        // Vehicles
        vehicles.forEach((v) => {
            const ref = doc(collection(db, "vehicles"));
            batch.set(ref, v);
        });

        // Lessons (Basic types)
        lessons.forEach((l) => {
            const ref = doc(collection(db, "lessons"));
            batch.set(ref, l);
        });

        // Instructors
        instructors.forEach((i) => {
            const ref = doc(collection(db, "instructors"));
            batch.set(ref, i);
        });

        // Packages
        lessonPackages.forEach((p) => {
            const ref = doc(collection(db, "lessonPackages"));
            batch.set(ref, p);
        });

        await batch.commit();
        console.log("Database seeded successfully!");
        return true;
    } catch (e) {
        console.error("Error seeding database: ", e);
        return false;
    }
};
