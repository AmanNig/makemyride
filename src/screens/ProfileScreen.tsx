import React, { useState } from 'react';
import { ArrowLeft, User, MapPin, CreditCard, Settings, LogOut, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from '../contexts/NavigationContext';

// Mock user data
const USER = {
  name: 'Jennifer Smith',
  email: 'jennifer@example.com',
  phone: '+1 (555) 123-4567',
  profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
};

const ProfileScreen: React.FC = () => {
  const { navigateTo, navigateBack } = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: USER.name,
    email: USER.email,
    phone: USER.phone,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // In a real app, this would save the data to an API
    setIsEditMode(false);
    // Show success toast or message
  };
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      // In a real app, this would clear auth state
      navigateTo('home');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-blue-500 text-white pt-16 pb-8 px-4 relative">
        <button 
          className="absolute top-4 left-4 p-2 rounded-full bg-blue-600"
          onClick={navigateBack}
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        
        <div className="flex items-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-blue-300">
            {USER.profileImage ? (
              <img 
                src={USER.profileImage} 
                alt={USER.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{USER.name}</h1>
            <p className="opacity-80">{USER.email}</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto px-4 -mt-5">
        {!isEditMode ? (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Profile Information</h2>
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => setIsEditMode(true)}
                >
                  Edit
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">{USER.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-800">{USER.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-800">{USER.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div 
                className="flex items-center p-4 border-b border-gray-100 cursor-pointer"
                onClick={() => navigateTo('payment')}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <CreditCard size={20} className="text-blue-500" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-medium text-gray-800">Payment Methods</p>
                  <p className="text-sm text-gray-500">Manage your payment options</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
              
              <div 
                className="flex items-center p-4 border-b border-gray-100 cursor-pointer"
                onClick={() => navigateTo('home')}
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <MapPin size={20} className="text-orange-500" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-medium text-gray-800">Saved Locations</p>
                  <p className="text-sm text-gray-500">Manage your saved addresses</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
              
              <div 
                className="flex items-center p-4 border-b border-gray-100 cursor-pointer"
                onClick={() => alert('Settings would open here')}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Settings size={20} className="text-gray-500" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="font-medium text-gray-800">App Settings</p>
                  <p className="text-sm text-gray-500">Notifications, preferences, and more</p>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
            
            <Button
              variant="outline"
              fullWidth
              className="!text-red-500 !border-red-200 hover:!bg-red-50"
              icon={<LogOut size={18} />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setIsEditMode(false);
                    setFormData({
                      name: USER.name,
                      email: USER.email,
                      phone: USER.phone,
                    });
                  }}
                >
                  Cancel
                </Button>
                
                <Button
                  fullWidth
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;