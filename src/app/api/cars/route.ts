import db from '@/lib/db';
import { NextResponse } from 'next/server';
import { InventoryItem, InventoryFilters } from '@/types/inventory-types';

// GET all inventory
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const client = await db;

    // Build filter from query params
    const filter: InventoryFilters = {
      brand: searchParams.get('brand') || undefined,
      status: 'available',
      // Add other things, like year, trim, color, minprice, maxprice
    }

    const inventory = await client.db()
      .collection<InventoryItem>('inventory')
      .find(filter)
      .toArray();
      
    return NextResponse.json(inventory);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

// POST a new car
export async function POST(request: Request) {
  try {
    const client = await db;
    const item: InventoryItem = await request.json();
    // Validate required fields
    if (!item.vin || !item.stockNumber) {
      return NextResponse.json(
        { error: 'VIN and Stock Number are required' },
        { status: 400 }
      );
    }

    const result = await client.db()
      .collection<InventoryItem>('inventory')
      .insertOne(item);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add inventory item' },
      { status: 500 }
    );
  }
}