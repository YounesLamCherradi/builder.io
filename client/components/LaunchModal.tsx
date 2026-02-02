import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function LaunchModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeenLaunchModal = localStorage.getItem("wyf_launch_modal_seen");

    if (!hasSeenLaunchModal) {
      // Show modal on first visit
      setIsVisible(true);
      // Mark as seen
      localStorage.setItem("wyf_launch_modal_seen", "true");
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md mx-4 p-8 bg-white rounded-2xl shadow-2xl transform animate-in slide-in-from-bottom-4 duration-500">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center space-y-6">
          {/* Animated Celebration Icon */}
          <div className="flex justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brand-red to-gray-900 bg-clip-text text-transparent animate-in fade-in slide-in-from-top-4 duration-700">
              Welcome! WYF Morocco is officially live!
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
            You are special to us, and we're thrilled to have you here
          </p>

          {/* Divider */}
          <div className="h-1 w-12 bg-gradient-to-r from-brand-red to-gray-900 mx-auto rounded-full"></div>

          {/* CTA Button */}
          <button
            onClick={handleClose}
            className="group w-full px-8 py-3 bg-gradient-to-r from-brand-red to-gray-900 text-white rounded-full font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 flex items-center justify-center gap-2"
          >
            Explore Opportunities
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-brand-red/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-green-100/20 rounded-full blur-3xl"></div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}
