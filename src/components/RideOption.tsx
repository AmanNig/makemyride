import React from 'react';
import { Car, Clock, DollarSign } from 'lucide-react';

export interface RideOptionType {
  id: string;
  name: string;
  price: number;
  time: number; // estimated time in minutes
  capacity: number;
  image?: string;
}

interface RideOptionProps {
  option: RideOptionType;
  selected: boolean;
  onSelect: (option: RideOptionType) => void;
}

const RideOption: React.FC<RideOptionProps> = ({ option, selected, onSelect }) => {
  return (
    <div 
      className={`flex items-center p-4 rounded-lg border mb-3 transition-all cursor-pointer ${
        selected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
      }`}
      onClick={() => onSelect(option)}
    >
      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
        {option.image ? (
          <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
        ) : (
          <Car size={32} className="text-gray-500" />
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800 flex items-center">
          {option.name}
          <span className="ml-2 bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1">
            {option.capacity} seats
          </span>
        </h3>
        
        <div className="flex items-center mt-1 text-sm text-gray-600">
          <Clock size={16} className="mr-1" />
          <span className="mr-4">{option.time} min</span>
          
          <DollarSign size={16} className="mr-1" />
          <span>${option.price.toFixed(2)}</span>
        </div>
      </div>
      
      <div className={`ml-4 w-6 h-6 border-2 rounded-full flex-shrink-0 ${
        selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
      }`}>
        {selected && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideOption;