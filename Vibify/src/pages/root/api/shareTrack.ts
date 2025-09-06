const baseUrl = import.meta.env.DEV ? "localhost:5173" : "https://vibify-chi.vercel.app"
export const shareTrack = async (trackTitle: string | undefined) => {

    if (trackTitle) {
        try {
            const linkToCopy = `${baseUrl}/track/${trackTitle}`;
            await navigator.clipboard.writeText(linkToCopy);
            console.log(`Copied link: ${linkToCopy}`);
            console.log(linkToCopy)
            return linkToCopy;
        } catch (error) {
            console.error('Error copying link:', error);
            throw error;
        }
    }
    return null;
};
