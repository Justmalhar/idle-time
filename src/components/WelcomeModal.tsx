import React from 'react';
import { X } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-emerald-500/20 p-8 rounded-lg max-w-md mx-4">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-mono text-emerald-400">system.init()</h2>
          <button 
            onClick={onClose}
            className="text-emerald-400/60 hover:text-emerald-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4 font-mono text-emerald-400/80">
          <p>Important: please don't lock your screen.</p>
          <p className="text-emerald-400/60">// We need this for the page to work.</p>
          
          <p>Don't rush to get up.</p>
          
          <p>I'll play a gong sound to let you know when the timer starts and ends.</p>
          
          <p className="text-emerald-400/60">// Take your time to return</p>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-8 bg-emerald-500 text-gray-900 py-2 rounded font-mono hover:bg-emerald-400 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}