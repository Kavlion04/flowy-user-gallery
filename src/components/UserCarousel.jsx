
import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Icons for navigation

// Sample data for carousel items (replace with dynamic data later if needed)
const carouselItems = [
  { id: 1, title: "Feature One", description: "Sleek and intuitive design.", imageUrl: "https://via.placeholder.com/600x400/A78BFA/FFFFFF?text=Feature+1" },
  { id: 2, title: "Feature Two", description: "Powerful and fast performance.", imageUrl: "https://via.placeholder.com/600x400/C4B5FD/1F2937?text=Feature+2" },
  { id: 3, title: "Feature Three", description: "Highly customizable options.", imageUrl: "https://via.placeholder.com/600x400/8B5CF6/FFFFFF?text=Feature+3" },
  { id: 4, title: "Feature Four", description: "Secure and reliable.", imageUrl: "https://via.placeholder.com/600x400/DDD6FE/1F2937?text=Feature+4" },
];

const UserCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect); // Re-check on reinitialization
  }, [emblaApi, onSelect]);

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Featured Highlights</h2>
      <div className="relative bg-gray-100 p-4 rounded-lg shadow">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {carouselItems.map(item => (
              <div key={item.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover"/>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold text-violet-700 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md disabled:opacity-50"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          aria-label="Previous slide"
        >
          <ChevronLeft className="text-violet-600" size={24} />
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md disabled:opacity-50"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          aria-label="Next slide"
        >
          <ChevronRight className="text-violet-600" size={24} />
        </button>
      </div>
    </section>
  );
};

export default UserCarousel;
