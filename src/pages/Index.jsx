import React, { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection.jsx';
import UserCarousel from '@/components/UserCarousel.jsx';
import UserCard from '@/components/UserCard.jsx';
import { fetchUsers } from '@/services/userService.js';
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { Button } from "@/components/ui/button"; // Import Button component

const Index = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skip, setSkip] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const initialLoadSize = 9;
  const loadMoreSize = 4;

  useEffect(() => {
    const loadInitialUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(initialLoadSize, 0);
        setUsers(data.users);
        setTotalUsers(data.total);
        setSkip(initialLoadSize); // Next skip will be after these initial users
        setError(null);
      } catch (err) {
        console.error("Failed to load users on Index page:", err);
        setError("Failed to load user data. Please try again later.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadInitialUsers();
  }, []);

  const handleLoadMore = async () => {
    if (loadingMore || users.length >= totalUsers) return;

    setLoadingMore(true);
    try {
      const data = await fetchUsers(loadMoreSize, skip);
      setUsers(prevUsers => [...prevUsers, ...data.users]);
      setSkip(prevSkip => prevSkip + data.users.length); // data.limit might be more accurate if API guarantees it
      // Total users should already be set from initial load, but good to keep it updated if API changes it.
      // setTotalUsers(data.total); 
      setError(null);
    } catch (err) {
      console.error("Failed to load more users:", err);
      // Potentially set a different error for "load more" failures
      setError("Failed to load more users. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  };

  const hasMoreUsers = users.length < totalUsers;

  return (
    <div className="space-y-12">
      <HeroSection />
      <UserCarousel />

      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Users</h2>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: initialLoadSize }).map((_, index) => (
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
        {error && !loading && ( // Show error only if not initial loading
          <div className="text-center text-red-500 bg-red-100 p-4 rounded-md">
            <p>{error}</p>
          </div>
        )}
        {!loading && users.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {users.map(user => (
              <UserCard key={`${user.id}-${user.username}`} user={user} />
            ))}
          </div>
        )}
        {/* Show loading skeletons for "load more" */}
        {loadingMore && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-10">
            {Array.from({ length: loadMoreSize }).map((_, index) => (
              <div key={`loading-more-${index}`} className="bg-white shadow-lg rounded-xl p-6">
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
        {!loading && !error && users.length === 0 && (
           <div className="text-center text-gray-500">
            <p>No users found.</p>
          </div>
        )}

        {!loading && hasMoreUsers && !loadingMore && (
          <div className="text-center mt-10">
            <Button onClick={handleLoadMore} disabled={loadingMore || !hasMoreUsers} variant="outline" size="lg">
              {loadingMore ? "Loading..." : "Load More Users"}
            </Button>
          </div>
        )}
        {!loading && !hasMoreUsers && users.length > 0 && (
            <p className="text-center mt-10 text-gray-500">All users loaded.</p>
        )}
      </section>
    </div>
  );
};

export default Index;
