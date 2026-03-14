import mongoose from 'mongoose';

/**
 * connectDB
 * Establishes a Mongoose connection to MongoDB.
 * Called once at server startup in index.ts.
 *
 * If the connection fails, the process exits immediately —
 * a server with no database is useless and should not pretend to run.
 */
export const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(uri);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    // Exit with failure code — lets hosting platforms (Render/Railway)
    // detect the crash and restart or alert you
    process.exit(1);
  }
};
