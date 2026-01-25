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

// Helper to determine status with confidence
async function getPlaceStatus(placeId: string) {
    // Get last 3 updates
    const updates = await Status.find({ placeId }).sort({ createdAt: -1 }).limit(3).lean();

    let status = 'UNKNOWN';
    let lastUpdated = null;
    let isUncertain = false;

    if (updates.length > 0) {
        const latest = updates[0];
        const timeDiff = Date.now() - new Date(latest.createdAt).getTime();
        const THIRTY_MINUTES = 30 * 60 * 1000;
        const FIFTEEN_MINUTES = 15 * 60 * 1000;

        if (timeDiff <= THIRTY_MINUTES) {
            status = latest.status;
            lastUpdated = latest.createdAt;

            // Confidence check:
            // If we have multiple recent updates (within 15 mins) and they conflict, flag uncertainty
            if (updates.length >= 2) {
                const secondLatest = updates[1];
                const timeDiff2 = Date.now() - new Date(secondLatest.createdAt).getTime();

                if (timeDiff2 <= FIFTEEN_MINUTES && latest.status !== secondLatest.status) {
                    // Conflict detected (e.g. Open -> Closed in short span)
                    isUncertain = true;
                }
            }
        }
    }
    return { currentStatus: status, lastUpdated, isUncertain };
}

// Search Places
app.get('/search', async (c) => {
    const query = c.req.query('q') || '';
    const city = c.req.query('city') || '';
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const skip = (page - 1) * limit;

    try {
        const filter: any = {};
        const andConditions = [];
        const stopWords = [' at ', ' in ', ' near ', ', '];

        // 1. Handle Explicit City/Area Input (from the dedicated City input)
        if (city) {
            // User might type an Area (Indiranagar) or City (Bangalore) here
            andConditions.push({
                $or: [
                    { city: { $regex: city.trim(), $options: 'i' } },
                    { area: { $regex: city.trim(), $options: 'i' } }
                ]
            });
        }

        // 2. Handle 'q' (General Query)
        if (query) {
            let processedQuery = query;
            let locationPart = "";

            // Check for explicit dividers like "Apollo at Hyderabad"
            for (const word of stopWords) {
                if (processedQuery.toLowerCase().includes(word)) {
                    const parts = processedQuery.split(new RegExp(word, 'i')); // Case insensitive split
                    if (parts.length > 1) {
                        processedQuery = parts[0].trim();
                        locationPart = parts[1].trim(); // The part after 'at' is likely location
                        break;
                    }
                }
            }

            // Main Term matches Name/Category OR if no divider, maybe Location fields too
            if (processedQuery) {
                const orConditions: any[] = [
                    { name: { $regex: processedQuery, $options: 'i' } },
                    { category: { $regex: processedQuery, $options: 'i' } }
                ];

                // If we didn't extract a separate location part, the user might have just typed a location in the main box
                // e.g. "Indiranagar"
                if (!locationPart) {
                    orConditions.push({ area: { $regex: processedQuery, $options: 'i' } });
                    orConditions.push({ city: { $regex: processedQuery, $options: 'i' } });
                }

                andConditions.push({ $or: orConditions });
            }

            // Location Part (e.g. "Hyderabad") matches City or Area
            if (locationPart) {
                andConditions.push({
                    $or: [
                        { city: { $regex: locationPart, $options: 'i' } },
                        { area: { $regex: locationPart, $options: 'i' } }
                    ]
                });
            }
        }

        if (andConditions.length > 0) {
            filter.$and = andConditions;
        }

        const places = await Place.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const placesWithStatus = await Promise.all(places.map(async (place: any) => {
            const statusInfo = await getPlaceStatus(place._id.toString());
            return { ...place, ...statusInfo };
        }));

        return c.json({ results: placesWithStatus, page, limit });
    } catch (error) {
        console.error("Search error:", error);
        return c.json({ error: 'Failed to search places' }, 500);
    }
});

// Get Single Place
app.get('/place', async (c) => {
    const id = c.req.query('id');
    if (!id) return c.json({ error: 'ID is required' }, 400);

    try {
        const place = await Place.findById(id).lean();
        if (!place) return c.json({ error: 'Place not found' }, 404);

        const statusInfo = await getPlaceStatus(place._id.toString());

        return c.json({ ...place, ...statusInfo });
    } catch (error) {
        return c.json({ error: 'Failed to fetch place' }, 500);
    }
});

// Create a Place (For demo seeding)
app.post('/places', async (c) => {
    try {
        const body = await c.req.json();
        const newPlace = await Place.create(body);
        return c.json(newPlace, 201);
    } catch (error) {
        console.error("Failed to create place:", error);
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
