import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export default function SoldStamp() {
  const [isSold, setIsSold] = useState(false);
  const [isStamping, setIsStamping] = useState(false);

  const handlePurchase = () => {
    setIsStamping(true);
    setTimeout(() => {
      setIsSold(true);
      setIsStamping(false);
    }, 600);
  };

  const handleUndo = () => {
    setIsSold(false);
    setIsStamping(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <style>
        {`
          @keyframes stampIn {
            0% { 
              transform: scale(0) rotate(-45deg);
              opacity: 0;
            }
            50% {
              transform: scale(1.3) rotate(-5deg);
              opacity: 0.8;
            }
            100% { 
              transform: scale(1) rotate(-2deg);
              opacity: 1;
            }
          }
          .stamp-animation {
            animation: stampIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        `}
      </style>

      <div className="relative">
        {(isStamping || isSold) && (
          <div className={`mb-8 ${isStamping ? 'stamp-animation' : ''}`}>
            <div className="relative border-8 border-red-500 rounded-lg p-8 transform -rotate-2">
              <h1 className="text-7xl font-bold text-red-500 tracking-wider" style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
                letterSpacing: '0.1em'
              }}>
                SOLD
              </h1>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={handlePurchase}
            disabled={isSold}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg"
          >
            Purchase
          </button>

          <button
            onClick={handleUndo}
            disabled={!isSold}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            Undo
          </button>
        </div>
      </div>
    </div>
  );
}
