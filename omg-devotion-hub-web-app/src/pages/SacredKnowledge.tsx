import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  BookOpen, 
  Search, 
  Star, 
  Clock, 
  Play,
  ChevronRight,
  Bookmark,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import omSymbol from "@/assets/om-symbol.png";

const categories = [
  { id: "all", name: "All", icon: "🕉️" },
  { id: "vedas", name: "Vedas", icon: "📜" },
  { id: "puranas", name: "Puranas", icon: "📚" },
  { id: "mantras", name: "Mantras", icon: "🔔" },
  { id: "stories", name: "Stories", icon: "📖" },
  { id: "festivals", name: "Festivals", icon: "🎊" },
];

const articles = [
  {
    id: 1,
    title: "The Significance of Gayatri Mantra",
    category: "mantras",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=400",
    description: "Discover the profound meaning and spiritual benefits of the most powerful Vedic mantra.",
    featured: true,
  },
  {
    id: 2,
    title: "108 Names of Lord Vishnu",
    category: "vedas",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1567591370504-80d5e6168509?w=400",
    description: "Learn the sacred 108 names of Lord Vishnu and their divine significance.",
    featured: false,
  },
  {
    id: 3,
    title: "Story of Samudra Manthan",
    category: "puranas",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1518568403628-df55701ade9e?w=400",
    description: "The epic tale of churning the ocean of milk by Devas and Asuras.",
    featured: true,
  },
  {
    id: 4,
    title: "Navratri - Nine Divine Nights",
    category: "festivals",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1577083753695-e010191bacb5?w=400",
    description: "Understanding the spiritual significance of worshipping nine forms of Goddess Durga.",
    featured: false,
  },
  {
    id: 5,
    title: "Hanuman Chalisa Explained",
    category: "mantras",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400",
    description: "Verse by verse explanation of the powerful Hanuman Chalisa with pronunciation guide.",
    featured: true,
  },
  {
    id: 6,
    title: "The Four Vedas",
    category: "vedas",
    readTime: "20 min",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    description: "An introduction to Rigveda, Samaveda, Yajurveda, and Atharvaveda.",
    featured: false,
  },
];

const SacredKnowledge = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = articles.filter((a) => a.featured);

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom">
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
              <h1 className="text-xl font-bold text-gradient-divine">Sacred Knowledge</h1>
            </div>
            <Button variant="ghost" size="icon">
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search scriptures, mantras, stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-muted/50"
            />
          </div>
        </div>
      </header>

      {/* Featured Section */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-secondary" />
            Featured Readings
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="shrink-0 w-72"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative h-40">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge variant="secondary" className="mb-2">
                        {categories.find((c) => c.id === article.category)?.icon}{" "}
                        {categories.find((c) => c.id === article.category)?.name}
                      </Badge>
                      <h3 className="font-semibold text-sm line-clamp-2">{article.title}</h3>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-2 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`shrink-0 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-primary to-secondary border-0"
                    : ""
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-6 px-4 pb-24">
        <div className="max-w-7xl mx-auto space-y-4">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="mb-2 text-xs">
                      {categories.find((c) => c.id === article.category)?.icon}{" "}
                      {categories.find((c) => c.id === article.category)?.name}
                    </Badge>
                    <h3 className="font-semibold mb-1 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        Audio available
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 self-center" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <div className="fixed bottom-6 left-4 right-4 md:hidden">
        <Card className="p-3 glass-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">Daily Shloka</p>
                <p className="text-xs text-muted-foreground">Start your day with wisdom</p>
              </div>
            </div>
            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
              Read
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SacredKnowledge;
