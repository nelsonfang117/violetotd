import Layout from '../../components/Layout';
import { notFound } from 'next/navigation';
import { inventory } from '../../../data/inventory';
import InventoryCard from '../../components/InventoryCard';
import { getValidInventory } from '@/lib/inventory-utils';
// Define your brand data with proper typing
interface BrandData {
    name: string;
    color: string;
    bgColor: string;
    models: string[];
}

const brandData: Record<string, BrandData> = {
    kia: {
        name: 'KIA',
        color: 'text-blue-700',
        bgColor: 'bg-blue-600',
        models: ['Seltos', 'Sportage', 'Telluride']
    },
    hyundai: {
        name: 'Hyundai',
        color: 'text-slate-700',
        bgColor: 'bg-slate-700',
        models: ['Tucson', 'Santa Fe', 'Palisade']
    }
};

// Helper function to safely get brand data
async function getBrandData(brandSlug: string) {
  return brandData[brandSlug] || null;
}

// Metadata for better Search Engine Optimization
export async function generateMetadata({ params }: { params: { brand: string } }) {
    const { brand: brandSlug } = await params;
    const brand = await getBrandData(brandSlug);
    
    if (!brand) {
        return {
        title: 'Brand Not Found',
        description: 'The requested brand does not exist'
        };
    }

    return {
        title: `VIOLETOTD ${brand.name} Vehicles`,
        description: `Explore ${brand.name}'s lineup of vehicles. Transparent prices, hassle-free, direct to your door.`
    };
}

export default async function BrandPage({ params }: { params: { brand: string } }) {
    const { brand: brandSlug } = await params;
    const brand = await getBrandData(brandSlug);
    const validInventory = getValidInventory(inventory);
    const availableCars = validInventory.filter(car => car.brand === brandSlug);
    if (!brand) {   
        return notFound();
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <h1 className={`text-4xl font-bold ${brand.color} mb-8`}>
                {brand.name} Vehicles
                </h1>
                
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {brand.models.map(model => (
                    <div key={model} className="border border-gray-200 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-2">{model}</h2>
                    <p className="text-gray-600 mb-4">
                        Explore the {brand.name} {model} model
                    </p>
                    <button 
                        className={`${brand.bgColor} text-white px-4 py-2 rounded hover:opacity-90`}
                    >
                        View Details
                    </button>
                    </div>
                ))}
                </div>
                <br></br>
                <h1 className="text-3xl font-bold mb-8">Current Inventory</h1>
      
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableCars.map(car => (
                    <InventoryCard key={car.id} car={car} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export async function generateStaticParams() {
    return Object.keys(brandData).map(brand => ({
        brand
    }));
}