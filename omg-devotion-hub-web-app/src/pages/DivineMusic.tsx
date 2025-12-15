import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Heart,
  Shuffle,
  Repeat,
  Volume2,
  ListMusic,
  Search,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import omSymbol from "@/assets/om-symbol.png";

const deities = [
  { id: "shiva", name: "Lord Shiva", icon: "🔱", color: "from-blue-500 to-purple-600" },
  { id: "krishna", name: "Lord Krishna", icon: "🦚", color: "from-blue-400 to-cyan-500" },
  { id: "ganesha", name: "Lord Ganesha", icon: "🕉️", color: "from-orange-400 to-red-500" },
  { id: "hanuman", name: "Lord Hanuman", icon: "🙏", color: "from-orange-500 to-amber-500" },
  { id: "lakshmi", name: "Goddess Lakshmi", icon: "🪷", color: "from-pink-400 to-rose-500" },
  { id: "durga", name: "Goddess Durga", icon: "⚔️", color: "from-red-500 to-orange-500" },
];

const playlists = [
  {
    id: 1,
    name: "Morning Bhajans",
    tracks: 24,
    duration: "2h 15m",
    image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400",
  },
  {
    id: 2,
    name: "Evening Aartis",
    tracks: 18,
    duration: "1h 45m",
    image: "https://images.unsplash.com/photo-1577083753695-e010191bacb5?w=400",
  },
  {
    id: 3,
    name: "Meditation Mantras",
    tracks: 12,
    duration: "3h 00m",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400",
  },
];

const recentTracks = [
  {
    id: 1,
    name: "Om Namah Shivaya",
    artist: "Sacred Chants",
    duration: "5:32",
    deity: "shiva",
  },
  {
    id: 2,
    name: "Hare Krishna Mahamantra",
    artist: "Divine Vocals",
    duration: "8:15",
    deity: "krishna",
  },
  {
    id: 3,
    name: "Ganesh Aarti",
    artist: "Temple Bells",
    duration: "4:48",
    deity: "ganesha",
  },
  {
    id: 4,
    name: "Hanuman Chalisa",
    artist: "Devotional Masters",
    duration: "9:22",
    deity: "hanuman",
  },
  {
    id: 5,
    name: "Om Jai Lakshmi Mata",
    artist: "Sacred Sounds",
    duration: "6:10",
    deity: "lakshmi",
  },
];

const DivineMusic = () => {
  const [selectedDeity, setSelectedDeity] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(recentTracks[0]);
  const [progress, setProgress] = useState([33]);
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom pb-40">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <img src={omSymbol} alt="OM" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-gradient-divine">Divine Music</h1>
            </div>
            <Button variant="ghost" size="icon">
              <ListMusic className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search bhajans, mantras, aartis..."
              className="pl-10 h-12 bg-muted/50"
            />
          </div>
        </div>
      </header>

      {/* Deity Selection */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Select Deity</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {deities.map((deity) => (
              <motion.button
                key={deity.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDeity(selectedDeity === deity.id ? null : deity.id)}
                className={`p-4 rounded-2xl text-center transition-all ${
                  selectedDeity === deity.id
                    ? `bg-gradient-to-br ${deity.color} text-white shadow-lg`
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <span className="text-3xl block mb-2">{deity.icon}</span>
                <span className="text-xs font-medium">{deity.name.split(" ")[1]}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Playlists */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Featured Playlists</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {playlists.map((playlist) => (
              <motion.div
                key={playlist.id}
                whileHover={{ scale: 1.02 }}
                className="shrink-0 w-40"
              >
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <img
                      src={playlist.image}
                      alt={playlist.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg"
                    >
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                    </motion.button>
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm truncate">{playlist.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {playlist.tracks} tracks • {playlist.duration}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Tracks */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Recent Tracks</h2>
          <div className="space-y-2">
            {recentTracks.map((track, index) => {
              const deity = deities.find((d) => d.id === track.deity);
              const isCurrentTrack = currentTrack.id === track.id;
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`p-3 cursor-pointer transition-all ${
                      isCurrentTrack ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => {
                      setCurrentTrack(track);
                      setIsPlaying(true);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${deity?.color || "from-primary to-secondary"} flex items-center justify-center text-xl`}>
                        {deity?.icon || "🎵"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold text-sm truncate ${isCurrentTrack ? "text-primary" : ""}`}>
                          {track.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{track.duration}</span>
                        {isCurrentTrack && isPlaying && (
                          <div className="flex gap-0.5">
                            {[1, 2, 3].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ height: [4, 16, 4] }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                className="w-1 bg-primary rounded-full"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Player */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border safe-bottom"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Progress */}
          <div className="mb-3">
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1:48</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Track Info & Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-xl">
                  {deities.find((d) => d.id === currentTrack.deity)?.icon || "🎵"}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{currentTrack.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLiked(!liked)}
                className={liked ? "text-accent" : ""}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="icon">
                <Shuffle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <SkipForward className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Repeat className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Volume2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DivineMusic;
