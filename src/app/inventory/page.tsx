import { InventoryItem, InventoryFilters } from '@/types/inventory-types';

export default async function InventoryPage({
    searchParams
}: {
    searchParams: InventoryFilters
}) {
    const params = new URLSearchParams();
    if (searchParams.brand) params.set('brand', searchParams.brand);
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice.toString());
    // Add other filters...

    const res = await fetch(`http://localhost:3000/api/inventory?${params.toString()}`);
    const inventory: InventoryItem[] = await res.json();

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Inventory</h1>
        
        {/* Filter UI */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="font-semibold mb-3">Filters</h2>
            <form className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <select name="brand" defaultValue={searchParams.brand}>
                <option value="">All Brands</option>
                <option value="kia">KIA</option>
                <option value="hyundai">Hyundai</option>
            </select>
            {/* Add other filter controls... */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Apply Filters
            </button>
            </form>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map(item => (
            <a 
                key={item.stockNumber} 
                href={`/inventory/${item.stockNumber}`}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
                <div className="p-4">
                <h2 className="text-xl font-semibold">
                    {item.year} {item.brand} {item.modelKey}
                </h2>
                <p className="text-gray-600">{item.trim}</p>
                <p className="mt-2 font-bold">${item.price.toLocaleString()}</p>
                </div>
            </a>
            ))}
        </div>
        </div>
    );
}