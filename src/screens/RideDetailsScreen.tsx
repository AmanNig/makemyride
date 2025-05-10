import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, MessageCircle, Phone, Star } from 'lucide-react';
import Map from '../components/Map';
import Button from '../components/Button';
import DriverCard from '../components/DriverCard';
import { useNavigate } from '../contexts/NavigationContext';

// Mock driver data
const DRIVER = {
  id: 'driver-1',
  name: 'Jason Miller',
  rating: 4.9,
  car: {
    model: 'Honda Civic',
    color: 'Blue',
    licensePlate: 'ABC 123',
  },
  eta: 3,
};

// Mock ride status steps
const RIDE_STATUSES = [
  { id: 'confirmed', label: 'Ride Confirmed', icon: <Star size={18} className="text-blue-500" /> },
  { id: 'driver-assigned', label: 'Driver Assigned', icon: <Star size={18} className="text-blue-500" /> },
  { id: 'arriving', label: 'Driver Arriving', icon: <MapPin size={18} className="text-blue-500" /> },
  { id: 'arrived', label: 'Driver Arrived', icon: <MapPin size={18} className="text-blue-500" /> },
  { id: 'in-progress', label: 'Ride in Progress', icon: <Clock size={18} className="text-blue-500" /> },
  { id: 'completed', label: 'Ride Completed', icon: <Star size={18} className="text-blue-500" /> },
];

const RideDetailsScreen: React.FC = () => {
  const { navigateTo, navigateBack, screenParams } = useNavigate();
  const { pickup, dropoff, ride } = screenParams;
  
  const [currentStatus, setCurrentStatus] = useState(0);
  const [driverLocation, setDriverLocation] = useState({
    lat: 40.7048,
    lng: -74.016,
    address: 'Approaching pickup location'
  });
  
  // Simulate driver getting closer over time
  useEffect(() => {
    if (currentStatus < 3) { // Before driver arrived
      const interval = setInterval(() => {
        setDriverLocation(prev => ({
          ...prev,
          lat: prev.lat + 0.002,
          lng: prev.lng + 0.002,
        }));
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [currentStatus]);
  
  // Simulate ride progress
  useEffect(() => {
    if (currentStatus < RIDE_STATUSES.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStatus(prev => prev + 1);
      }, 10000); // Advance status every 10 seconds
      
      return () => clearTimeout(timeout);
    }
  }, [currentStatus]);
  
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
  
  const handleCallDriver = () => {
    // In a real app, this would initiate a call
    alert('Calling driver...');
  };
  
  const handleMessageDriver = () => {
    // In a real app, this would open a messaging interface
    alert('Messaging driver...');
  };
  
  const handleCancelRide = () => {
    if (window.confirm('Are you sure you want to cancel this ride?')) {
      navigateTo('home');
    }
  };

  return (
    <div className="pb-24">
      <div className="relative w-full h-56 bg-blue-50">
        <Map 
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          driverLocation={currentStatus < 3 ? driverLocation : null}
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
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            {currentStatus >= 5 ? 'Ride Completed' : 'Ride in Progress'}
          </h1>
          
          <div className="flex justify-between text-sm text-gray-500 mb-6">
            <span>{ride.name}</span>
            <span>${ride.price.toFixed(2)}</span>
          </div>
          
          {/* Status Timeline */}
          <div className="relative mb-8">
            <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
            
            {RIDE_STATUSES.map((status, index) => (
              <div 
                key={status.id} 
                className={`relative flex items-start mb-4 ${index > currentStatus ? 'opacity-40' : ''}`}
              >
                <div className={`
                  w-7 h-7 rounded-full flex items-center justify-center z-10
                  ${index <= currentStatus ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'}
                `}>
                  {status.icon}
                </div>
                
                <div className="ml-4">
                  <p className={`font-medium ${index <= currentStatus ? 'text-gray-800' : 'text-gray-500'}`}>
                    {status.label}
                  </p>
                  
                  {index === 1 && currentStatus >= 1 && (
                    <p className="text-sm text-gray-500 mt-1">
                      {DRIVER.name} is on the way
                    </p>
                  )}
                  
                  {index === 2 && currentStatus >= 2 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Driver is {DRIVER.eta} min away
                    </p>
                  )}
                  
                  {index === 3 && currentStatus >= 3 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Driver is waiting at {pickup}
                    </p>
                  )}
                  
                  {index === 4 && currentStatus >= 4 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Estimated arrival: {ride.time} min
                    </p>
                  )}
                  
                  {index === 5 && currentStatus >= 5 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Thanks for riding with us!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Driver Card - Only show before ride completion */}
          {currentStatus < 5 && (
            <DriverCard
              {...DRIVER}
              onCall={handleCallDriver}
              onMessage={handleMessageDriver}
            />
          )}
          
          {/* Ride Details */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <div className="flex mb-3">
              <div className="w-10 flex-shrink-0 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div className="w-0.5 h-full bg-gray-300 my-1"></div>
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              </div>
              
              <div className="flex-1">
                <div className="mb-3">
                  <p className="font-medium text-gray-800">{pickup}</p>
                  <p className="text-sm text-gray-500">Pickup location</p>
                </div>
                
                <div>
                  <p className="font-medium text-gray-800">{dropoff}</p>
                  <p className="text-sm text-gray-500">Dropoff location</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Total Fare</p>
                <p className="font-bold text-gray-800">${ride.price.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium text-gray-800">Credit Card •••• 4567</p>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-6 space-y-3">
            {currentStatus < 3 && (
              <Button
                variant="outline"
                fullWidth
                onClick={handleCancelRide}
              >
                Cancel Ride
              </Button>
            )}
            
            {currentStatus >= 5 && (
              <>
                <Button
                  fullWidth
                  onClick={() => navigateTo('home')}
                >
                  Book Another Ride
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    // In a real app, this would open a review form
                    alert('Thanks for the review!');
                    navigateTo('home');
                  }}
                >
                  Rate Your Ride
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetailsScreen;