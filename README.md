# DriveHire - Driving Services Platform

A React + Firebase scaffold for a driving services website (Chauffeurs + Driving School).

## Features
- **Frontend**: Vite, React, Tailwind CSS
- **Auth**: Firebase Auth (Email/Password, Google) with Role management (Customer, Driver, Admin).
- **Booking Flow**: Multi-step wizard for booking drivers.
- **Dashboards**:
    - **User**: View booking history.
    - **Admin**: Seed database, manage resources (stub).
    - **Driver**: (Stub) view jobs.
- **Backend**: Firebase Firestore, Cloud Functions (stubs).

## Setup Instructions

### 1. Prerequisites
- Node.js installed.
- A Firebase Project created at [console.firebase.google.com](https://console.firebase.google.com).

### 2. Environment Variables
Create a `.env` file in the root directory with your Firebase config keys:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Installation
```bash
npm install
```

### 4. Running Locally
```bash
npm run dev
```

### 5. Seeding Data
1. Sign up a new user.
2. Manually change your role to `admin` in Firestore Console -> `users` collection -> `[your_uid]` -> `role: "admin"`.
   OR navigate to `/admin` if you haven't secured it deeply yet (Currently `/admin` route checks for 'admin' role, so you must update Firestore first).
3. Go to `/admin` in the app.
4. Click **Seed Database**.

### 6. Deployment
**Vercel (Frontend)**:
1. Push to GitHub.
2. Import project in Vercel.
3. Add Environment Variables in Vercel settings.
4. Deploy.

**Firebase (Backend/Functions)**:
1. `npm install -g firebase-tools`
2. `firebase login`
3. `firebase init` (Select Firestore, Functions, Storage).
4. Overwrite `firestore.rules` and `functions/index.js` with the provided files if prompted, or copy them back after init.
5. `firebase deploy`
