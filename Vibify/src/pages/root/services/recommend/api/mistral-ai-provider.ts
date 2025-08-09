import { createMistral } from '@ai-sdk/mistral';
import { generateObject } from 'ai';
import { z } from 'zod';
import { getTrendingTracks } from '../../api/getTrendingTracks';
import { Track } from '@/pages/root/types/track';

const trackSchema = z.object({
    id: z.string().describe('The unique identifier of the track.'),
    title: z.string().describe('The title of the track.'),
    artwork: z.object({
        "150x150": z.string().url().describe('URL to the 150x150 artwork image.'),
    }).describe('Artwork URLs for the track.'),
    user: z.object({
        name: z.string().describe('The name of the artist/user who uploaded the track.'),
    }).describe('Information about the user/artist.'),
});

const recommendedTracksSchema = z.object({
    tracks: z.array(trackSchema)
        .length(10, { message: 'Exactly 10 tracks must be recommended.' })
        .describe('An array of 10 recommended tracks.'),
});

export const maxDuration = 30;

const mistralApiKey = import.meta.env.VITE_MISTRAL_AI_API_KEY;

if (!mistralApiKey) {
    throw new Error('Mistral API key is not configured');
}

const mistral = createMistral({
    apiKey: mistralApiKey
});

// Helper function to simplify track data for the prompt
function simplifyTracksForPrompt(tracks: Track[]) {
    return tracks.map(track => ({
        id: track.id,
        title: track.title,
        artwork: track.artwork,
        user: { name: track.user.name },
    }));
}

export async function recommendTracks() {
    try {
        const allTracks = await getTrendingTracks();
        if (!allTracks || allTracks.length === 0) {
            throw new Error('No tracks available for recommendation');
        }

        // Use only top 30 tracks instead of 100, and simplify the data
        const simplifiedTracks = simplifyTracksForPrompt(allTracks.slice(0, 30));

        const { object: recommendedTracks } = await generateObject({
            model: mistral('mistral-large-latest'),
            schema: recommendedTracksSchema,
            prompt: `
                You are a music recommendation AI. Select exactly 10 diverse tracks from the following list.
                For each track, you MUST include:
                1. The exact track ID
                2. The complete title (unchanged)
                3. Artwork object with "150x150" URL
                4. User object with artist name

                IMPORTANT FORMAT REQUIREMENTS:
                - The response MUST be an object with a "tracks" property containing exactly 10 track objects.
                - Each track object MUST have "id", "title", "artwork", and "user" properties.
                - The "artwork" property MUST be an object with a "150x150" property.
                - The "user" property MUST be an object with a "name" property.

                Select tracks that represent:
                - Different genres/styles
                - Mix of established and emerging artists
                - High quality productions

                Available tracks (simplified format):
                ${JSON.stringify(simplifiedTracks, null, 2)}
            `,
        });

        return recommendedTracksSchema.parse(recommendedTracks);
    } catch (error) {
        console.error('Error generating track recommendations:', error);
        return { tracks: [] };
    }
}