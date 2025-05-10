import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';

interface LocationInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  suggestions?: string[];
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onClear,
  suggestions = [],
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Small delay to allow clicking on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative mb-4">
      <label
        htmlFor={`location-${label}`}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div
        className={`flex items-center border rounded-lg overflow-hidden transition-all ${
          isFocused
            ? 'border-blue-500 ring-2 ring-blue-100'
            : 'border-gray-300'
        }`}
      >
        <div className="pl-3 pr-2">
          <MapPin
            size={20}
            className={`${
              isFocused ? 'text-blue-500' : 'text-gray-400'
            } transition-colors`}
          />
        </div>
        <input
          id={`location-${label}`}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full py-2 px-1 outline-none text-gray-700"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="pr-3 pl-1 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Location suggestions */}
      {showSuggestions && value && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 max-h-64 overflow-y-auto">
          {suggestions
            .filter((suggestion) =>
              suggestion.toLowerCase().includes(value.toLowerCase())
            )
            .map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start border-b border-gray-100 last:border-0"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <MapPin size={16} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{suggestion}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;