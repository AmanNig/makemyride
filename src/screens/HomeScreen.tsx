import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import LocationInput from '../components/LocationInput';
import Button from '../components/Button';
import Map from '../components/Map';
import { useNavigate } from '../contexts/NavigationContext';

// Mock location suggestions
const LOCATION_SUGGESTIONS = [
  '123 Main St, New York, NY',
  '456 Broadway, New York, NY',
  'Grand Central Terminal, New York, NY',
  'Times Square, New York, NY',
  'Central Park, New York, NY',
  'Empire State Building, New York, NY',
  'Brooklyn Bridge, New York, NY',
  'JFK Airport, Queens, NY',
  'LaGuardia Airport, Queens, NY',
];

interface Location {
  lat: number;
  lng: number;
  address: string;
}

const HomeScreen: React.FC = () => {
  const { navigateTo } = useNavigate();
  const [pickup, setPickup] = useState<string>('');
  const [dropoff, setDropoff] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  
  const handleBookRide = () => {
    if (pickup && dropoff) {
      navigateTo('ride-booking', { pickup, dropoff });
    }
  };
  
  const handleMapClick = (location: Location) => {
    if (!pickup) {
      setPickup(location.address);
      setPickupLocation(location);
    } else if (!dropoff) {
      setDropoff(location.address);
      setDropoffLocation(location);
    }
  };

  return (
    <div className="pb-20">
      <div className="relative w-full h-72 sm:h-80 md:h-96 bg-blue-50">
        <Map 
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          onMapClick={handleMapClick}
          className="w-full h-full"
        />
      </div>
      
      <div className="max-w-md mx-auto px-4 -mt-16">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Where are you going?</h1>
          
          <LocationInput
            label="Pickup Location"
            placeholder="Enter pickup address"
            value={pickup}
            onChange={(value) => {
              setPickup(value);
              if (!value) setPickupLocation(null);
            }}
            onClear={() => {
              setPickup('');
              setPickupLocation(null);
            }}
            suggestions={LOCATION_SUGGESTIONS}
          />
          
          <LocationInput
            label="Destination"
            placeholder="Enter destination address"
            value={dropoff}
            onChange={(value) => {
              setDropoff(value);
              if (!value) setDropoffLocation(null);
            }}
            onClear={() => {
              setDropoff('');
              setDropoffLocation(null);
            }}
            suggestions={LOCATION_SUGGESTIONS}
          />
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <div className="flex items-center border rounded-lg p-2 border-gray-300 hover:border-blue-500 cursor-pointer">
                <Clock size={20} className="text-gray-400 mr-2" />
                <span className="text-gray-700">Now</span>
              </div>
              <span className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
                When
              </span>
            </div>
            
            <div className="relative">
              <div className="flex items-center border rounded-lg p-2 border-gray-300 hover:border-blue-500 cursor-pointer">
                <Calendar size={20} className="text-gray-400 mr-2" />
                <span className="text-gray-700">Today</span>
              </div>
              <span className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
                Date
              </span>
            </div>
          </div>
          
          <Button
            fullWidth
            size="lg"
            disabled={!pickup || !dropoff}
            onClick={handleBookRide}
          >
            Book a Ride
          </Button>
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Locations</h2>
          
          <div className="space-y-3">
            <div 
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer"
              onClick={() => {
                setPickup('Home');
                setPickupLocation({
                  lat: 40.7128,
                  lng: -74.006,
                  address: 'Home'
                });
              }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPin size={18} className="text-blue-500" />
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-800">Home</div>
                <div className="text-sm text-gray-500">123 Home St, New York, NY</div>
              </div>
            </div>
            
            <div 
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer"
              onClick={() => {
                setPickup('Work');
                setPickupLocation({
                  lat: 40.7328,
                  lng: -73.996,
                  address: 'Work'
                });
              }}
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MapPin size={18} className="text-orange-500" />
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-800">Work</div>
                <div className="text-sm text-gray-500">456 Office Ave, New York, NY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;