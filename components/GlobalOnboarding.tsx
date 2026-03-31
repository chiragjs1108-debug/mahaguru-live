"use client";

import { useAuth } from "@/context/AuthContext";
import OnboardingModal from "./OnboardingModal";

export default function GlobalOnboarding() {
  const { currentUser, isProfileIncomplete, completeOnboarding } = useAuth();

  if (currentUser && isProfileIncomplete) {
    return <OnboardingModal userId={currentUser.uid} onComplete={completeOnboarding} />;
  }

  return null;
}