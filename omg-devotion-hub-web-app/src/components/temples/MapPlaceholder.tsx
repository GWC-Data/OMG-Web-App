import { motion } from "framer-motion";
import { MapPin, Navigation2, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Temple } from "@/data/temples";

interface MapPlaceholderProps {
  temples: Temple[];
  selectedTemple: Temple | null;
  onLocateMe: () => void;
}

export const MapPlaceholder = ({ temples, selectedTemple, onLocateMe }: MapPlaceholderProps) => {
  return (
    <div className="relative w-full h-full bg-muted/30 rounded-2xl overflow-hidden">
      {/* Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Animated Gradient Background */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-accent/20 to-divine-purple/20 rounded-full blur-3xl"
      />
      
      {/* Temple Markers */}
      <div className="absolute inset-0">
        {temples.map((temple, index) => {
          const isSelected = selectedTemple?.id === temple.id;
          // Distribute markers in a more realistic pattern
          const positions = [
            { top: "25%", left: "30%" },
            { top: "35%", left: "65%" },
            { top: "50%", left: "45%" },
            { top: "60%", left: "25%" },
            { top: "70%", left: "70%" },
            { top: "40%", left: "80%" },
          ];
          const pos = positions[index % positions.length];
          
          return (
            <motion.div
              key={temple.id}
              initial={{ scale: 0, y: 20 }}
              animate={{ 
                scale: isSelected ? 1.3 : 1, 
                y: 0,
              }}
              transition={{ delay: index * 0.1 }}
              className="absolute"
              style={{ top: pos.top, left: pos.left }}
            >
              <div 
                className={`relative cursor-pointer transition-all ${
                  isSelected ? "z-10" : "z-0"
                }`}
              >
                <motion.div
                  animate={isSelected ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    isSelected 
                      ? "bg-gradient-to-br from-primary to-secondary" 
                      : "bg-card border border-border"
                  }`}
                >
                  <MapPin className={`w-5 h-5 ${
                    isSelected ? "text-primary-foreground" : "text-primary"
                  }`} />
                </motion.div>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-12 left-1/2 -translate-x-1/2 bg-card rounded-lg shadow-xl p-2 min-w-[120px] border border-border"
                  >
                    <p className="text-xs font-semibold text-center whitespace-nowrap">
                      {temple.name}
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                      {temple.distance} km away
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
        
        {/* User Location Marker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-8 h-8 bg-blue-500 rounded-full"
            />
            <div className="relative w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <Navigation2 className="w-4 h-4 text-white" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="bg-card shadow-lg"
          onClick={onLocateMe}
        >
          <Locate className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Note about Mapbox */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border">
          <p className="text-xs text-muted-foreground text-center">
            🗺️ Connect Mapbox for interactive maps
          </p>
        </div>
      </div>
    </div>
  );
};
