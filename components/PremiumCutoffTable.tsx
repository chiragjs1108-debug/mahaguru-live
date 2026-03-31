'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client for the browser
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PremiumCutoffTable({ ncism_id }: { ncism_id: string }) {
  const [selectedCategory, setSelectedCategory] = useState('GM');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Still simulating auth for now
  const [cutoffData, setCutoffData] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the data from Supabase when the component loads
  useEffect(() => {
    async function fetchPremiumData() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('zone_2_premium_vault')
        .select('sq_r1_json')
        .eq('ncism_id', ncism_id)
        .single();

      if (data && data.sq_r1_json) {
        setCutoffData(data.sq_r1_json);
      } else if (error) {
        console.error("Error fetching premium data:", error);
      }
      setIsLoading(false);
    }

    fetchPremiumData();
  }, [ncism_id]);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading live cutoff data...</div>;
  }

  if (!cutoffData) {
    return <div className="p-8 text-center text-gray-500 border rounded-lg">No cutoff data available for this college yet.</div>;
  }

  // Get the data for the currently selected dropdown category
  const currentData = cutoffData[selectedCategory] || { open_air: 'N/A', close_air: 'N/A', safe_score: 'N/A' };

  // Generate dropdown options dynamically based on the keys in our JSON blob
  const availableCategories = Object.keys(cutoffData);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      
      {/* The Filter Header */}
      <div className="p-6 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">State Quota (SQ) Cutoffs</h3>
          <p className="text-sm text-gray-500">Filter by your specific Karnataka category</p>
        </div>
        
        <select 
          className="border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>{cat} Quota</option>
          ))}
        </select>
      </div>

      {/* The Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Seat Type</th>
              <th className="p-4 font-semibold">Opening AIR (Free)</th>
              <th className="p-4 font-semibold">Closing AIR (Premium)</th>
              <th className="p-4 font-semibold">2026 Safe Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-900">{selectedCategory}</td>
              
              {/* Free Data: Always visible */}
              <td className="p-4 text-green-600 font-semibold">
                {currentData.open_air !== 'N/A' ? currentData.open_air.toLocaleString() : 'N/A'}
              </td>
              
              {/* Premium Data: Closing AIR */}
              <td className="p-4">
                {isLoggedIn ? (
                  <span className="text-gray-900 font-semibold">
                    {currentData.close_air !== 'N/A' ? currentData.close_air.toLocaleString() : 'N/A'}
                  </span>
                ) : (
                  <div className="relative group cursor-pointer inline-block" onClick={() => setIsLoggedIn(true)}>
                    <span className="filter blur-[4px] text-gray-400 select-none">123,456</span>
                    <span className="absolute inset-0 flex items-center justify-center text-gray-700 group-hover:text-blue-600">
                      🔒
                    </span>
                  </div>
                )}
              </td>

              {/* Premium Data: 2026 Safe Score */}
              <td className="p-4">
                {isLoggedIn ? (
                  <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-md">
                    {currentData.safe_score !== 'N/A' ? `${currentData.safe_score}+` : 'N/A'}
                  </span>
                ) : (
                  <div className="relative group cursor-pointer inline-block" onClick={() => setIsLoggedIn(true)}>
                    <span className="filter blur-[4px] bg-gray-200 text-gray-200 px-3 py-1 rounded-md select-none">500+</span>
                    <span className="absolute inset-0 flex items-center justify-center text-gray-700 group-hover:text-blue-600">
                      🔒
                    </span>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* The Freemium Upsell CTA */}
      {!isLoggedIn && (
        <div className="bg-blue-50 p-6 text-center border-t border-blue-100">
          <h4 className="text-blue-900 font-semibold mb-2">Unlock the complete 2026 Prediction Matrix</h4>
          <p className="text-blue-700 text-sm mb-4">Stop guessing. Get exact closing ranks and safe scores for all categories.</p>
          <button 
            onClick={() => setIsLoggedIn(true)} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Simulate User Login
          </button>
        </div>
      )}
      
      {isLoggedIn && (
        <div className="p-4 text-center border-t border-gray-200">
           <button 
            onClick={() => setIsLoggedIn(false)} 
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Log out (Lock data)
          </button>
        </div>
      )}

    </div>
  );
}