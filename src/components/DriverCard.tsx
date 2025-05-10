import React from 'react';
import { Star, Phone, MessageCircle } from 'lucide-react';

interface DriverProps {
  id: string;
  name: string;
  rating: number;
  car: {
    model: string;
    color: string;
    licensePlate: string;
  };
  image?: string;
  eta: number; // minutes
  onCall?: () => void;
  onMessage?: () => void;
}

const DriverCard: React.FC<DriverProps> = ({
  name,
  rating,
  car,
  image,
  eta,
  onCall,
  onMessage,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-2 border-blue-500">
            {image ? (
              <img src={image} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-500">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="ml-4 flex-1">
            <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
            
            <div className="flex items-center mt-1">
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-700">{rating.toFixed(1)}</span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-600">{car.model}</span>
            </div>
            
            <div className="mt-1 text-sm text-gray-600">
              {car.color} • {car.licensePlate}
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-between">
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {eta} min away
            </div>
          </div>
        </div>
        
        <div className="flex mt-4 border-t pt-4">
          <button
            onClick={onCall}
            className="flex-1 flex items-center justify-center py-2 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600 transition-colors"
          >
            <Phone size={18} className="mr-2" />
            Call
          </button>
          
          <button
            onClick={onMessage}
            className="flex-1 flex items-center justify-center py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <MessageCircle size={18} className="mr-2" />
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverCard;