// src/scripts/seed.ts
require('dotenv').config();
const { MongoClient } = require('mongodb');
const path = require('path');
const { InventoryItem } = require('../types/inventory-types');

const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error(`
    ❌ MONGODB_URI is missing!
    Create a .env file with:
    MONGODB_URI="mongodb+srv://username:password@cluster0.abc123.mongodb.net/yourdb?retryWrites=true&w=majority"
    `);
    process.exit(1);
}

const sampleData: typeof InventoryItem[] = [
    {
        id: 'KS-2023-001',
        brand: 'kia',
        modelKey: 'sorento',
        year: '2023',
        trim: 'SX Prestige',
        vin: 'KNDPMCAC5P7123456',
        stockNumber: 'KIA23001',
        color: 'Gravity Gray',
        interior: 'Black',
        mileage: 15,
        status: 'available',
        price: 38995,
        features: ['Panoramic Sunroof', 'Heated Seats', 'Premium Audio'],
        images: ['/cars/kia-sorento-1.jpg'],
        arrivalDate: '2023-05-15',
        location: 'Lot A'
    },
    {
        id: 'KS-2023-002',
        brand: 'kia',
        modelKey: 'sorento',
        year: '2022',
        trim: 'SX Prestige',
        vin: 'KNDPMCAC5P7123457',
        stockNumber: 'KIA22001',
        color: 'Black',
        interior: 'Black',
        mileage: 15,
        status: 'available',
        price: 37995,
        features: ['Panoramic Sunroof', 'Heated Seats', 'Premium Audio'],
        images: ['/cars/kia-sorento-2.jpg'],
        arrivalDate: '2022-05-15',
        location: 'Lot A'
    }
];

async function seed() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db();
        
        // Clear existing data (optional)
        await db.collection('inventory').deleteMany({});
        
        // Insert sample data
        const result = await db.collection('inventory')
        .insertMany(sampleData);
        
        console.log(`✅ Inserted ${result.insertedCount} documents`);
        console.log('View your data in MongoDB Atlas:');
        console.log('https://cloud.mongodb.com/v2/[YOUR-CLUSTER-ID]#/metrics/replicaSet/[YOUR-CLUSTER-ID]/explorer/[DB]/inventory/find');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await client.close();
        process.exit(0);
    }
}

seed();