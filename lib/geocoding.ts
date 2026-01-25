export async function searchLocation(query: string) {
    if (!query || query.length < 3) return null;

    try {
        // Using OpenStreetMap Nominatim API
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
            {
                headers: {
                    'User-Agent': 'Isitopen-App' // Required by Nominatim
                }
            }
        );

        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
                displayName: data[0].display_name
            };
        }
    } catch (error) {
        console.error("Geocoding failed", error);
    }
    return null;
}

export async function reverseGeocode(lat: number, lng: number) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            {
                headers: {
                    'User-Agent': 'Isitopen-App'
                }
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Reverse geocoding failed", error);
        return null;
    }
}
