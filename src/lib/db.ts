import { MongoClient } from 'mongodb';

// This file is a db connection manager

// Connection pooling is a pool of reusable db connections that my app can draw from instead of creating new 
// connections for each request

// Initialization
const uri = process.env.MONGODB_URI;
const options = {
    // Timeouts
    connectTimeoutMS: 5000,    // 5 seconds to establish connection
    socketTimeoutMS: 30000,    // 30 seconds for operations
    serverSelectionTimeoutMS: 10000, // 10 seconds to select server

    // Connection pooling settings:
    maxPoolSize: 10,      // Maximum simultaneous connections
    minPoolSize: 1,       // Maintain at least 1 connection
    maxIdleTimeMS: 30000, // Close idle connections after 30s
    waitQueueTimeoutMS: 5000 // Fail fast if no connections available
};
// Timeouts below prevent application from hanging indefinitely when db operations take too long
// const options = {
//   connectTimeoutMS: 5000,
//   socketTimeoutMS: 30000
// };

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error('Please define MONGODB_URI environment variable');
}

// Connection Strategy
try {
  if (process.env.NODE_ENV === 'development') {
    // Reuse an existing connection if available
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri!, options);

        // Event listeners
        client.on('serverOpening', () => 
            console.log('Connecting to MongoDB...'));
        client.on('serverClosed', () => 
            console.error('MongoDB connection closed!'));
        client.on('serverHeartbeatFailed', ({ failure }) => 
            console.error('Heartbeat failed:', failure));

        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // Always start a new connection in prod
    client = new MongoClient(uri!, options);

    // Event listeners
    client.on('serverOpening', () => 
        console.log('Connecting to MongoDB...'));
    client.on('serverClosed', () => 
        console.error('MongoDB connection closed!'));
    client.on('serverHeartbeatFailed', ({ failure }) => 
        console.error('Heartbeat failed:', failure));

    clientPromise = client.connect();
  }
} catch (err) {
    console.error('MongoDB connection error:', err);
    throw new Error('Database connection failed');
}

clientPromise.then(async (connectedClient) => {
    try {
        await connectedClient.db().command({ ping: 1 });
        console.log('✅ MongoDB connection verified');
    } catch (err) {
        console.error('❌ MongoDB health check failed:', err);
        // Optional: Trigger alert system here
    }
}).catch(err => {
    console.error('❌ Initial connection failed:', err);
});

export default clientPromise;