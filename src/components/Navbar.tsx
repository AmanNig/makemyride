import React from 'react';
import { Menu, User, X } from 'lucide-react';
import { useNavigate } from '../contexts/NavigationContext';

interface NavbarProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleMenu }) => {
  const { navigateTo } = useNavigate();
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span 
                className="text-2xl font-bold text-blue-500 cursor-pointer"
                onClick={() => navigateTo('home')}
              >
                RideShare
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 space-x-4">
            <button
              onClick={() => navigateTo('rides')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              My Rides
            </button>
            <button
              onClick={() => navigateTo('payment')}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              Payment
            </button>
            <button
              onClick={() => navigateTo('profile')}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-500"
            >
              <User size={18} className="mr-2" />
              Profile
            </button>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <button
              onClick={() => {
                navigateTo('rides');
                toggleMenu();
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 w-full text-left"
            >
              My Rides
            </button>
            <button
              onClick={() => {
                navigateTo('payment');
                toggleMenu();
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 w-full text-left"
            >
              Payment
            </button>
            <button
              onClick={() => {
                navigateTo('profile');
                toggleMenu();
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 w-full text-left"
            >
              Profile
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;