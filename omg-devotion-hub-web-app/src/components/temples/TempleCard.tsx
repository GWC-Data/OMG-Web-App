import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Star, 
  Navigation, 
  Users,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Temple } from "@/data/temples";

interface TempleCardProps {
  temple: Temple;
  onSelect: (temple: Temple) => void;
  isSelected: boolean;
}

export const TempleCard = ({ temple, onSelect, isSelected }: TempleCardProps) => {
  const statusConfig = {
    available: { 
      icon: CheckCircle, 
      label: "Darshan Available", 
      color: "bg-green-500/10 text-green-600 border-green-500/30" 
    },
    crowded: { 
      icon: AlertCircle, 
      label: "Crowded", 
      color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30" 
    },
    closed: { 
      icon: XCircle, 
      label: "Closed", 
      color: "bg-red-500/10 text-red-600 border-red-500/30" 
    },
  };

  const status = statusConfig[temple.darshanStatus];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={`overflow-hidden cursor-pointer transition-all ${
          isSelected 
            ? "ring-2 ring-primary shadow-lg" 
            : "hover:shadow-md"
        }`}
        onClick={() => onSelect(temple)}
      >
        <div className="flex gap-4 p-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <img
              src={temple.image}
              alt={temple.name}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-1 left-1 flex items-center gap-1 bg-card/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-secondary text-secondary" />
              <span className="text-xs font-medium">{temple.rating}</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {temple.name}
                </h3>
                <p className="text-xs text-muted-foreground">{temple.deity}</p>
              </div>
              <Badge variant="outline" className={`shrink-0 text-xs ${status.color}`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status.label}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">{temple.address}</span>
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-xs">
                <Navigation className="w-3 h-3 text-primary" />
                <span className="font-medium">{temple.distance} km</span>
              </div>
              {temple.darshanStatus !== "closed" && (
                <div className="flex items-center gap-1 text-xs">
                  <Users className="w-3 h-3 text-accent" />
                  <span>{temple.waitTime} min wait</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{temple.timings.morning}</span>
            </div>
          </div>
        </div>
        
        <div className="px-4 pb-4 flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
          <Button size="sm" variant="outline">
            Details
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
