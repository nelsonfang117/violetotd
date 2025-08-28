import db from '@/lib/db';

export async function GET() {
  try {
    const client = await db;
    await client.db().command({ ping: 1 });
    return new Response('✅ Database connection healthy', { 
      status: 200,
      headers: {
        'Content-Type': 'text/plain'
      } 
    });
  } catch (err) {
    console.error('❌ Health check failed:', err);
    return new Response('❌ Database connection failed', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}