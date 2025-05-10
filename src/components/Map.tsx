import React, { useEffect, useRef } from 'react';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface MapProps {
  pickupLocation?: Location | null;
  dropoffLocation?: Location | null;
  driverLocation?: Location | null;
  onMapClick?: (location: Location) => void;
  className?: string;
}

const Map: React.FC<MapProps> = ({
  pickupLocation,
  dropoffLocation,
  driverLocation,
  onMapClick,
  className = 'h-64 w-full rounded-lg'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would be where we initialize a real map like Google Maps or Mapbox
    // For this mockup, we'll just create a simple placeholder
    
    if (mapRef.current) {
      const mapElement = mapRef.current;
      
      // Add markers if we have locations
      if (pickupLocation) {
        addMarker(mapElement, 'pickup', 10, 10);
      }
      
      if (dropoffLocation) {
        addMarker(mapElement, 'dropoff', 60, 40);
      }
      
      if (driverLocation) {
        addMarker(mapElement, 'driver', 30, 30);
      }
    }
  }, [pickupLocation, dropoffLocation, driverLocation]);

  const addMarker = (mapElement: HTMLDivElement, type: string, top: number, left: number) => {
    const marker = document.createElement('div');
    marker.className = `absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10`;
    
    // Style based on marker type
    if (type === 'pickup') {
      marker.style.backgroundColor = '#3B82F6'; // blue
      marker.style.top = `${top}%`;
      marker.style.left = `${left}%`;
    } else if (type === 'dropoff') {
      marker.style.backgroundColor = '#F97316'; // orange
      marker.style.top = `${top}%`;
      marker.style.left = `${left}%`;
    } else if (type === 'driver') {
      marker.style.backgroundColor = '#10B981'; // green
      marker.style.top = `${top}%`;
      marker.style.left = `${left}%`;
    }
    
    mapElement.appendChild(marker);
    
    return marker;
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onMapClick) return;
    
    // In a real app, we would convert click coordinates to lat/lng
    // Here we'll just use the relative position in the div as a mock
    const rect = mapRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      
      onMapClick({
        lat: 40.7128 + (percentY - 50) / 500, // Fake lat centered around NYC
        lng: -74.006 + (percentX - 50) / 500, // Fake lng centered around NYC
        address: 'Selected Location' // In a real app, we would reverse geocode this
      });
    }
  };

  return (
    <div 
      ref={mapRef} 
      className={`relative bg-blue-50 ${className}`}
      onClick={handleMapClick}
      role="application"
      aria-label="Map"
    >
      {/* Map grid lines for visual effect */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`col-${i}`} className="border-r border-blue-100" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`row-${i}`} className="border-b border-blue-100" />
        ))}
      </div>
      
      {/* This would be replaced by actual map in production */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-gray-400 text-sm">Interactive Map</p>
      </div>
      
      {/* If we have both pickup and dropoff, draw a line between them */}
      {pickupLocation && dropoffLocation && (
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[30%] border-t-2 border-dashed border-blue-300 transform -rotate-12 origin-top-left" />
      )}
    </div>
  );
};

export default Map;