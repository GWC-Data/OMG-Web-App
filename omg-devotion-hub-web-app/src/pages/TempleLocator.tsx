import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Search, 
  Filter,
  MapPin,
  List,
  Map as MapIcon,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TempleCard } from "@/components/temples/TempleCard";
import { MapPlaceholder } from "@/components/temples/MapPlaceholder";
import { temples, Temple } from "@/data/temples";
import omSymbol from "@/assets/om-symbol.png";
import { toast } from "@/hooks/use-toast";

const TempleLocator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredTemples = temples.filter((temple) => {
    const matchesSearch = 
      temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filterStatus === "all" || temple.darshanStatus === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleLocateMe = () => {
    toast({
      title: "Finding your location...",
      description: "Getting nearby temples based on your current location.",
    });
  };

  const handleSelectTemple = (temple: Temple) => {
    setSelectedTemple(temple);
    if (viewMode === "list") {
      setViewMode("map");
    }
  };

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon" className="mr-2">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <img src={omSymbol} alt="OM" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-gradient-divine">Temple Locator</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-gradient-to-r from-primary to-secondary border-0" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
                className={viewMode === "map" ? "bg-gradient-to-r from-primary to-secondary border-0" : ""}
              >
                <MapIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search temples, deities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-muted/50 border-border/50"
            />
          </div>
        </div>
      </header>

      {/* Filter Pills */}
      <section className="py-3 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Button variant="ghost" size="sm" className="shrink-0">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <div className="w-px h-6 bg-border" />
            {[
              { id: "all", label: "All Temples", icon: "🕉️" },
              { id: "available", label: "Open Now", icon: "✅" },
              { id: "crowded", label: "Crowded", icon: "⚠️" },
            ].map((filter) => (
              <motion.div key={filter.id} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={filterStatus === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(filter.id)}
                  className={`shrink-0 ${
                    filterStatus === filter.id
                      ? "bg-gradient-to-r from-primary to-secondary border-0"
                      : ""
                  }`}
                >
                  <span className="mr-1">{filter.icon}</span>
                  {filter.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Live Darshan Status</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {filteredTemples.filter(t => t.darshanStatus === "available").length} temples with darshan available nearby
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Temple List */}
          <div className={`space-y-4 ${viewMode === "map" ? "hidden lg:block" : ""}`}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredTemples.length} temples found
              </p>
              <Button variant="ghost" size="sm" onClick={handleLocateMe}>
                <MapPin className="w-4 h-4 mr-1" />
                Near Me
              </Button>
            </div>
            
            {filteredTemples.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No temples found</h3>
                <p className="text-muted-foreground">Try adjusting your search</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {filteredTemples.map((temple) => (
                  <TempleCard
                    key={temple.id}
                    temple={temple}
                    onSelect={handleSelectTemple}
                    isSelected={selectedTemple?.id === temple.id}
                  />
                ))}
              </motion.div>
            )}
          </div>

          {/* Map View */}
          <div className={`${viewMode === "list" ? "hidden lg:block" : ""}`}>
            <div className="sticky top-32 h-[calc(100vh-200px)] min-h-[400px]">
              <MapPlaceholder
                temples={filteredTemples}
                selectedTemple={selectedTemple}
                onLocateMe={handleLocateMe}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Map Toggle */}
      {viewMode === "map" && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 left-4 right-4 lg:hidden z-30"
        >
          <Button
            className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full shadow-xl"
            onClick={() => setViewMode("list")}
          >
            <List className="w-5 h-5 mr-2" />
            View Temple List ({filteredTemples.length})
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default TempleLocator;
