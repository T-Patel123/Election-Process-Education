import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "MOCK_API_KEY",
  authDomain: "mock-election-app.firebaseapp.com",
  projectId: "mock-election-app",
  storageBucket: "mock-election-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
