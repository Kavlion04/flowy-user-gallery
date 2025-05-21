
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="h-40 bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
        <img 
          src={user.image || 'https://via.placeholder.com/100'} 
          alt={`${user.firstName} ${user.lastName}`} 
          className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
        <p className="text-sm text-gray-500 mb-1">{user.company?.title || 'N/A'}</p>
        <p className="text-md text-violet-600 mb-4">{user.company?.name || 'Company Name'}</p>
        
        <div className="space-y-3 text-left text-sm text-gray-700">
          <div className="flex items-center">
            <Mail size={16} className="mr-2 text-violet-500" />
            <a href={`mailto:${user.email}`} className="hover:text-violet-600 truncate" title={user.email}>{user.email}</a>
          </div>
          <div className="flex items-center">
            <Phone size={16} className="mr-2 text-violet-500" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-start">
            <MapPin size={16} className="mr-2 mt-0.5 text-violet-500 flex-shrink-0" />
            <span>{user.address?.address}, {user.address?.city}, {user.address?.state} {user.address?.postalCode}</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-3 text-center">
        <span className="text-xs text-gray-500">Username: {user.username}</span>
      </div>
    </div>
  );
};

export default UserCard;
