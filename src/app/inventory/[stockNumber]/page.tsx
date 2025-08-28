"use client"
import db from '@/lib/db';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InventoryItem } from '@/types/inventory-types';
import { inventory } from '@/data/inventory';
import { use } from 'react';

export default function InventoryDetailPage({
    params
    }: {
    params: Promise<{ stockNumber: string }>
    }) {
        // Temporary debug code for MongoDB
        // console.log('Params received:', params);
        // console.log('Stock number looking for:', params.stockNumber);


        // const client = await db;
        // const item = await client.db()
        //     .collection<InventoryItem>('inventory')
        //     .findOne({ stockNumber: params.stockNumber });
        // const allItems = await client.db()
        //     .collection<InventoryItem>('inventory')
        //     .find()
        //     .toArray();
        // console.log('All items in database:', allItems.map(i => i.stockNumber));
        const unwrappedParams = use(params);
        const stockNumber = unwrappedParams.stockNumber;
        const router = useRouter();
        const item = inventory.find(car => car.stockNumber === stockNumber);
        if (!item) {
            return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Vehicle Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Stock number <strong>{stockNumber}</strong> not found in our inventory.
                </p>
                <button 
                    onClick={() => router.back()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                </button>
                </div>
            </div>
            );
        }
        return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link 
            href="/inventory"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Inventory
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative h-96 rounded-lg overflow-hidden">
              {/* <Image
                src={item.images[0] || '/placeholder-car.jpg'}
                alt={`${item.year} ${item.brand} ${item.modelKey} ${item.trim}`}
                fill
                className="object-cover"
                priority
              /> */}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {item.images.slice(1).map((image, index) => (
                <div key={index} className="relative h-24 rounded overflow-hidden">
                  {/* <Image
                    src={image}
                    alt={`${item.year} ${item.brand} - View ${index + 2}`}
                    fill
                    className="object-cover"
                  /> */}
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {item.year} {item.brand.toUpperCase()} {item.modelKey} {item.trim}
              </h1>
              <p className="text-gray-600 mt-2">Stock #: {item.stockNumber}</p>
            </div>

            {/* Pricing */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-700">
                  ${item.price.toLocaleString()}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === 'available' 
                    ? 'bg-green-100 text-green-800'
                    : item.status === 'reserved'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                * Price excludes tax, title, license, and dealer fees
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <strong>Color:</strong> {item.color}
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Interior:</strong> {item.interior}
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Mileage:</strong> {item.mileage.toLocaleString()} mi
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <strong>Location:</strong> {item.location}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
                Schedule Test Drive
              </button>
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vehicle Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Vehicle Details</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">VIN:</span>
                  <span className="font-medium">{item.vin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock Number:</span>
                  <span className="font-medium">{item.stockNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Arrival Date:</span>
                  <span className="font-medium">{item.arrivalDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium capitalize">{item.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features & Options */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Features & Options</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ul className="grid grid-cols-1 gap-2">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}