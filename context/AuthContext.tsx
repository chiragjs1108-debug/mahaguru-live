"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut, User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
  currentUser: User | null;
  subscriptionTier: "Free" | "11" | "111" | "1111";
  isProfileIncomplete: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [subscriptionTier, setSubscriptionTier] = useState<"Free" | "11" | "111" | "1111">("Free");
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            setSubscriptionTier(data.subscriptionTier || "Free");
            setIsProfileIncomplete(!data.onboardingComplete);
          } else {
            // First time login: Create user and trigger modal
            await setDoc(userDocRef, {
              email: user.email,
              name: user.displayName,
              subscriptionTier: "Free",
              onboardingComplete: false,
              createdAt: new Date().toISOString(),
            });
            setSubscriptionTier("Free");
            setIsProfileIncomplete(true);
          }
        } catch (error) {
          console.error("Firestore connection error:", error);
          // Failsafe: If offline, don't crash the app. Default to Free tier.
          setSubscriptionTier("Free");
          setIsProfileIncomplete(false);
        }
      } else {
        setSubscriptionTier("Free");
        setIsProfileIncomplete(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const logout = () => signOut(auth);
  const completeOnboarding = () => setIsProfileIncomplete(false);

  return (
    <AuthContext.Provider value={{ currentUser, subscriptionTier, isProfileIncomplete, loading, signInWithGoogle, logout, completeOnboarding }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};