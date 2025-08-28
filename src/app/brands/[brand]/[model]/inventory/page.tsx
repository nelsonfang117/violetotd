import { notFound } from 'next/navigation';
import { getInventoryModel } from '../../../../../data/cars';
import InventoryCard from '../../../../components/InventoryCard';
import { getValidInventory } from '@/lib/inventory-utils';
import { inventory } from '@/data/inventory';

export default function ModelInventoryPage({
  params
}: {
  params: { brand: string; model: string }
}) {
    const validInventory = getValidInventory(inventory);
    const availableCars = validInventory.filter(car => car.status === "available");
    if (availableCars.length === 0) {
        return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-bold">No inventory available for this model</h2>
            <p className="mt-4">Please check back later or contact us for availability</p>
        </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
            Available {params.model.toUpperCase()} Inventory
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCars.map(car => (
            <InventoryCard key={car.id} car={car} />
            ))}
        </div>
        </div>
    );
}