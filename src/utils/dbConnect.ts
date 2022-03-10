import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

async function dbConnect() {
    let client: typeof mongoose | undefined;

    if (process.env.NODE_ENV === "development") {
        let globalWithMongoClientPromise = global as typeof globalThis & {
            _mongoClientPromise: Promise<typeof mongoose>;
        };

        if (client) return client;

        if (!globalWithMongoClientPromise._mongoClientPromise) {
            const opts = {
                bufferCommands: false,
            };

            globalWithMongoClientPromise._mongoClientPromise = mongoose
                .connect(MONGODB_URI as string, opts)
                .then((mongoose) => {
                    return mongoose;
                });
        }
        client = await globalWithMongoClientPromise._mongoClientPromise;
        return client;
    } else {
        const opts = {
            bufferCommands: false,
        };
        return await mongoose
            .connect(MONGODB_URI as string, opts)
            .then((mongoose) => {
                return mongoose;
            });
    }
}
export default dbConnect;
