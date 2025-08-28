"use client";
import { InventoryItem } from '@/types/inventory-types';
import Image from 'next/image';
import { useFees } from '@/hooks/useFees';
import { useInventoryCard } from '@/hooks/useInventoryCard';

export default function InventoryCard({ car }: { car: InventoryItem }) {
  const { calculateOTD } = useFees();
  const { isExpanded, toggleExpand } = useInventoryCard(car);
  const otdPrice = calculateOTD(car.price);

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
      <div className="relative h-48">
        <img
          src={car.images[0] || '/placeholder-car.jpg'}
          alt={`${car.year} KIA ${car.modelKey} ${car.trim}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">
          {car.year} KIA {car.modelKey} {car.trim}
        </h2>
        
        <div className="flex justify-between mt-2">
          <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">{car.color}</span>
          <span className="font-semibold text-blue-700">MSRP ${car.price.toLocaleString()}</span>
        </div>
        
        <div className="mt-3 p-2 bg-blue-50 rounded">
          <div className="flex justify-between font-semibold">
            <span className="text-gray-700">OTD Price:</span>
            <span className="text-green-700">${otdPrice.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="font-semibold text-gray-700 mb-1">Key Features:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {car.features.slice(0, isExpanded ? car.features.length : 3).map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
          {car.features.length > 3 && (
            <button 
              onClick={toggleExpand}
              className="text-blue-600 text-xs mt-1 hover:underline"
            >
              {isExpanded ? 'Show less' : `Show ${car.features.length - 3} more`}
            </button>
          )}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-medium">
            View Details
          </button>
          <button className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors font-medium">
            Contact Dealer
          </button>
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          <p>Price includes doc fee, license tab, and tax</p>
        </div>
      </div>
    </div>
  );
}