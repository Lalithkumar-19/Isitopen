import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import connectDB from '@/lib/db';
import { Place, Status } from '@/lib/models';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

// Middleware to ensure DB connection
app.use('*', async (c, next) => {
    await connectDB();
    await next();
});

// Health check
app.get('/health', (c) => {
    return c.json({ status: 'ok', message: 'IsItOpen API is running' });
});

// Search Places
app.get('/search', async (c) => {
    const query = c.req.query('q') || '';
    const city = c.req.query('city') || '';

    try {
        const filter: any = {};
        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ];
        }
        if (city) {
            filter.city = { $regex: city, $options: 'i' };
        }

        const start = Date.now();
        const places = await Place.find(filter).lean();

        // For each place, get the latest status
        // In a real app, we might optimize this with an aggregation or by storing current status on the Place document
        const placesWithStatus = await Promise.all(places.map(async (place: any) => {
            const latestStatus = await Status.findOne({ placeId: place._id }).sort({ createdAt: -1 });

            let status = 'UNKNOWN';
            let lastUpdated = null;

            if (latestStatus) {
                const timeDiff = Date.now() - new Date(latestStatus.createdAt).getTime();
                // 30 minutes expiry logic
                const THIRTY_MINUTES = 30 * 60 * 1000;

                if (timeDiff <= THIRTY_MINUTES) {
                    status = latestStatus.status;
                } else {
                    status = 'UNKNOWN'; // Expired
                }
                lastUpdated = latestStatus.createdAt;
            }

            return {
                ...place,
                currentStatus: status,
                lastUpdated
            };
        }));

        return c.json({ results: placesWithStatus });
    } catch (error) {
        return c.json({ error: 'Failed to search places' }, 500);
    }
});

// Create a Place (For demo seeding)
app.post('/places', async (c) => {
    try {
        const body = await c.req.json();
        const newPlace = await Place.create(body);
        return c.json(newPlace, 201);
    } catch (error) {
        return c.json({ error: 'Failed to create place' }, 400);
    }
});

// Update Status
app.post('/status', async (c) => {
    try {
        const { placeId, status, updatedBy } = await c.req.json();
        const newStatus = await Status.create({
            placeId,
            status,
            updatedBy
        });
        return c.json(newStatus, 201);
    } catch (error) {
        return c.json({ error: 'Failed to update status' }, 400);
    }
});


export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
