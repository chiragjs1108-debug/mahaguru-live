"use client";

import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ShieldCheck, Phone, MapPin, GraduationCap, Stethoscope, Loader2 } from 'lucide-react';

const INDIAN_STATES = [
  "Karnataka", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", 
  "Lakshadweep", "Puducherry"
];

const COUNSELLING_TYPES = ["All India Quota (AIQ)", "State Quota", "Deemed University", "Both (AIQ + State)"];
const COURSES = ["MBBS", "BDS", "BAMS", "BHMS", "BUMS", "B.Sc Nursing"];

interface OnboardingModalProps {
  userId: string;
  onComplete: () => void;
}

export default function OnboardingModal({ userId, onComplete }: OnboardingModalProps) {
  const [mobile, setMobile] = useState('');
  const [state, setState] = useState('Karnataka');
  const [counselling, setCounselling] = useState(COUNSELLING_TYPES[0]);
  const [course, setCourse] = useState(COURSES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^[0-9]{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', userId), {
        mobileNumber: mobile,
        state,
        preferredCounselling: counselling,
        course,
        onboardingComplete: true // We flag them as complete here
      });
      onComplete();
    } catch (err) {
      console.error("Error saving profile:", err);
      setError('Failed to save details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-300">
        <div className="bg-[#0B1120] p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.8)_0%,transparent_60%)]"></div>
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">Complete Your Profile</h2>
            <p className="text-blue-200 text-sm">We need a few details to personalize your AI counseling experience.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl font-medium">{error}</div>}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" /> Mobile Number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+91</span>
              <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="9876543210" className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-slate-900" required />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" /> State of Domicile
            </label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-slate-900 appearance-none" required>
              {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-slate-400" /> Preferred Counselling
            </label>
            <select value={counselling} onChange={(e) => setCounselling(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-slate-900 appearance-none" required>
              {COUNSELLING_TYPES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-slate-400" /> Target Course
            </label>
            <select value={course} onChange={(e) => setCourse(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium text-slate-900 appearance-none" required>
              {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button type="submit" disabled={loading || mobile.length !== 10} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-4">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</> : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}