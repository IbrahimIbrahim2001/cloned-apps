import { Card } from '@/components/ui/card'
import { Track } from '@/pages/root/types/track'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { addToHistory } from '../../api/addToHistory';
import { useMusic } from '@/pages/root/store';
import { useOptimisticHistoryStore } from '../../history/store';
import { PlayCircle } from 'lucide-react';

export default function RecommendedTrack({ track }: { track: Track }) {
  const { openPlayer, setMusic } = useMusic();
  const { optimisticHistory, setOptimisticHistory } = useOptimisticHistoryStore();
  const playTrack = () => {
    setMusic(track);
    setOptimisticHistory([track, ...optimisticHistory])
    openPlayer();
    addToHistory(track);
  };

  return (
    <div onClick={playTrack} className="group relative cursor-pointer">
      <Card className="flex flex-row items-center gap-3 bg-background text-primary/90 border-0">
        <div className="relative w-16 h-16 rounded-md overflow-hidden">
          <Avatar className="w-full h-full">
            <AvatarImage src={track.artwork["150x150"]} alt={track.title} className="object-cover w-full h-full" />
            <AvatarFallback className="rounded-md flex items-center justify-center bg-gray-200 text-gray-600">
              {track.title.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            <PlayCircle className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg">{track.title}</h3>
          <p className="text-sm text-gray-600">{track.user.name}</p>
        </div>
      </Card>
    </div>
  )
}
