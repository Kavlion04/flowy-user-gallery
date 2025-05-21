
import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection.jsx';
import UserCarousel from '@/components/UserCarousel.jsx';
import UserCard from '@/components/UserCard.jsx';
import { fetchUsers } from '@/services/userService.js';
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

const Index = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await fetchUsers(9); // Fetch 9 users for a 3x3 grid
        setUsers(fetchedUsers);
        setError(null);
      } catch (err) {
        console.error("Failed to load users on Index page:", err);
        setError("Failed to load user data. Please try again later.");
        setUsers([]); // Clear users on error
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="space-y-12">
      <HeroSection />
      <UserCarousel />

      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Users</h2>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="bg-white shadow-lg rounded-xl p-6">
                <Skeleton className="h-24 w-24 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && users.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
        {!loading && !error && users.length === 0 && (
           <div className="text-center text-gray-500">
            <p>No users found.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
