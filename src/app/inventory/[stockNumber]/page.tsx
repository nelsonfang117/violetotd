import db from '@/lib/db';
import { InventoryItem } from '@/types/inventory-types';

export default async function InventoryDetailPage({
    params
    }: {
    params: { stockNumber: string }
    }) {
        
        const allParams = await params;

        const client = await db;
        const item = await client.db()
            .collection<InventoryItem>('inventory')
            .findOne({ stockNumber: allParams.stockNumber });

        if (!item) return <div>Vehicle not found</div>;

        return (
            <div className="p-6">
            <h1 className="text-2xl font-bold">
                {item.year} {item.brand} {item.modelKey} - {item.trim}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                <h2 className="font-semibold">Details</h2>
                <ul className="space-y-2 mt-2">
                    <li><strong>VIN:</strong> {item.vin}</li>
                    <li><strong>Stock #:</strong> {item.stockNumber}</li>
                    <li><strong>Color:</strong> {item.color} / {item.interior}</li>
                    <li><strong>Mileage:</strong> {item.mileage.toLocaleString()} mi</li>
                    <li><strong>Status:</strong> {item.status}</li>
                </ul>
                </div>

                <div>
                <h2 className="font-semibold">Features</h2>
                <ul className="list-disc list-inside mt-2">
                    {item.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                    ))}
                </ul>
                </div>
            </div>
            </div>
        );
}