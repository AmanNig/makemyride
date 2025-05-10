import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import RideOption, { RideOptionType } from '../components/RideOption';
import Button from '../components/Button';
import Map from '../components/Map';
import { useNavigate } from '../contexts/NavigationContext';

// Mock ride options
const RIDE_OPTIONS: RideOptionType[] = [
  {
    id: 'economy',
    name: 'Economy',
    price: 12.99,
    time: 15,
    capacity: 4,
  },
  {
    id: 'comfort',
    name: 'Comfort',
    price: 18.50,
    time: 15,
    capacity: 4,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 25.99,
    time: 15,
    capacity: 4,
  },
  {
    id: 'xl',
    name: 'XL',
    price: 29.99,
    time: 18,
    capacity: 6,
  }
];

const RideBookingScreen: React.FC = () => {
  const { navigateTo, navigateBack, screenParams } = useNavigate();
  const { pickup, dropoff } = screenParams;
  
  const [selectedOption, setSelectedOption] = useState<RideOptionType | null>(null);
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState(true); // Set true for demo
  
  // Calculate pickup and dropoff locations for map
  const pickupLocation = {
    lat: 40.7128,
    lng: -74.006,
    address: pickup
  };
  
  const dropoffLocation = {
    lat: 40.7328,
    lng: -73.986,
    address: dropoff
  };
  
  const handleConfirmRide = () => {
    if (selectedOption) {
      navigateTo('ride-details', { 
        pickup, 
        dropoff, 
        ride: selectedOption 
      });
    }
  };

  return (
    <div className="pb-24">
      <div className="relative w-full h-56 bg-blue-50">
        <Map 
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          className="w-full h-full"
        />
        
        <button 
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md"
          onClick={navigateBack}
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
      </div>
      
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-t-lg shadow-lg p-6 -mt-12 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Select a ride</h2>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <Clock size={14} className="mr-1" /> 
                Pickup in 3-5 min
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">{pickup} to</p>
              <p className="font-medium text-gray-800">{dropoff}</p>
            </div>
          </div>
          
          <div className="mb-6">
            {RIDE_OPTIONS.map((option) => (
              <RideOption
                key={option.id}
                option={option}
                selected={selectedOption?.id === option.id}
                onSelect={setSelectedOption}
              />
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-3">
                  <DollarSign size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Credit Card</p>
                  <p className="text-sm text-gray-500">•••• 4567</p>
                </div>
              </div>
              
              <button 
                className="text-blue-500 text-sm font-medium"
                onClick={() => navigateTo('payment')}
              >
                Change
              </button>
            </div>
          </div>
          
          <Button
            fullWidth
            size="lg"
            disabled={!selectedOption || !isPaymentMethodSelected}
            onClick={handleConfirmRide}
          >
            {selectedOption ? `Confirm ${selectedOption.name} - $${selectedOption.price.toFixed(2)}` : 'Select a ride'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Import required for the component
function DollarSign(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}

export default RideBookingScreen;