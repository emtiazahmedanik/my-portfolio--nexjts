import * as admin from 'firebase-admin';

let dbInstance: any = null;

function initializeFirebase() {
  // Return existing instance if already initialized
  if (dbInstance) {
    return dbInstance;
  }

  // Check if environment variables exist
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    console.warn('Firebase environment variables not set');
    return null;
  }

  try {
    // Check if Firebase Admin is already initialized
    if (!admin.apps.length) {
      // Handle private key - replace literal \n with actual newlines
      let privateKey = process.env.FIREBASE_PRIVATE_KEY;
      
      // If the key is a string with literal \n, convert them to actual newlines
      if (typeof privateKey === 'string') {
        privateKey = privateKey.replace(/\\n/g, '\n');
      }

      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    }

    dbInstance = admin.firestore();
    console.log('Firebase Admin initialized successfully');
    return dbInstance;
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    return null;
  }
}

// Initialize on module load
initializeFirebase();

export { initializeFirebase };
export const adminDb = () => initializeFirebase() || dbInstance;
export default admin;
