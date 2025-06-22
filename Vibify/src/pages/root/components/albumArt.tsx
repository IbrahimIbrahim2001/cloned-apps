interface AlbumArtProps {
    artwork: string
    title: string
}

export function AlbumArt({ artwork, title }: AlbumArtProps) {
    return (
        <div className="flex-1 flex items-center justify-center px-8 py-4">
            <div className="relative">
                <img
                    src={artwork || "/placeholder.svg"}
                    alt={`${title} cover`}
                    className="w-80 h-80 rounded-2xl shadow-2xl object-cover"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
            </div>
        </div>
    )
}
