import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar,
  Bell,
  Sun,
  Moon,
  Star,
  Clock,
  ChevronRight,
  Sparkles,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import omSymbol from "@/assets/om-symbol.png";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const todayPoojas = [
  {
    id: 1,
    name: "Surya Namaskar",
    time: "6:00 AM",
    deity: "Lord Surya",
    icon: "☀️",
    description: "Start your day with 12 sacred salutations to the Sun God",
    duration: "15 min",
    completed: false,
  },
  {
    id: 2,
    name: "Ganesh Vandana",
    time: "7:30 AM",
    deity: "Lord Ganesha",
    icon: "🕉️",
    description: "Remove obstacles and seek blessings for the day",
    duration: "10 min",
    completed: true,
  },
  {
    id: 3,
    name: "Evening Aarti",
    time: "6:30 PM",
    deity: "All Deities",
    icon: "🪔",
    description: "Traditional evening prayers with diya and incense",
    duration: "20 min",
    completed: false,
  },
];

const upcomingFestivals = [
  {
    id: 1,
    name: "Maha Shivaratri",
    date: "Feb 26",
    deity: "Lord Shiva",
    icon: "🔱",
    daysLeft: 15,
  },
  {
    id: 2,
    name: "Holi",
    date: "Mar 14",
    deity: "Lord Krishna",
    icon: "🎨",
    daysLeft: 31,
  },
  {
    id: 3,
    name: "Ram Navami",
    date: "Apr 6",
    deity: "Lord Rama",
    icon: "🏹",
    daysLeft: 54,
  },
];

const personalDeities = [
  { name: "Lord Shiva", icon: "🔱", day: "Monday", mantra: "Om Namah Shivaya" },
  { name: "Lord Ganesha", icon: "🕉️", day: "Wednesday", mantra: "Om Gan Ganapataye Namah" },
  { name: "Goddess Lakshmi", icon: "🪷", day: "Friday", mantra: "Om Shreem Mahalakshmiyei Namah" },
];

const PersonalizedPooja = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  const currentDate = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(currentDate.getDate() - currentDate.getDay() + i);
    return date;
  });

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <img src={omSymbol} alt="OM" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-gradient-divine">Pooja Calendar</h1>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={remindersEnabled}
                onCheckedChange={setRemindersEnabled}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Week Calendar */}
      <section className="py-4 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between">
            {dates.map((date, index) => {
              const isToday = date.toDateString() === currentDate.toDateString();
              const isSelected = index === selectedDay;
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(index)}
                  className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
                    isSelected
                      ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                      : isToday
                      ? "bg-muted"
                      : ""
                  }`}
                >
                  <span className="text-xs font-medium opacity-70">{weekDays[index]}</span>
                  <span className="text-lg font-bold">{date.getDate()}</span>
                  {isToday && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Today's Poojas */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-secondary" />
            Today's Rituals
          </h2>
          <div className="space-y-3">
            {todayPoojas.map((pooja, index) => (
              <motion.div
                key={pooja.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-4 ${pooja.completed ? "opacity-60" : ""}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      pooja.completed 
                        ? "bg-muted" 
                        : "bg-gradient-to-br from-primary/20 to-secondary/20"
                    }`}>
                      {pooja.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${pooja.completed ? "line-through" : ""}`}>
                          {pooja.name}
                        </h3>
                        {pooja.completed && (
                          <Badge variant="secondary" className="text-xs">Done</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{pooja.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {pooja.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {pooja.deity}
                        </span>
                      </div>
                    </div>
                    {!pooja.completed && (
                      <Button size="sm" variant="outline" className="shrink-0">
                        Start
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Deities */}
      <section className="py-6 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent" />
            Your Ishta Devatas
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {personalDeities.map((deity, index) => (
              <motion.div
                key={deity.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <span className="text-3xl mb-2 block">{deity.icon}</span>
                  <p className="font-semibold text-sm mb-1">{deity.name}</p>
                  <p className="text-xs text-muted-foreground">{deity.day}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Festivals */}
      <section className="py-6 px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Upcoming Festivals
          </h2>
          <div className="space-y-3">
            {upcomingFestivals.map((festival, index) => (
              <motion.div
                key={festival.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                      {festival.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{festival.name}</h3>
                      <p className="text-sm text-muted-foreground">{festival.deity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{festival.date}</p>
                      <p className="text-xs text-muted-foreground">{festival.daysLeft} days left</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Pooja Button */}
      <div className="fixed bottom-6 left-4 right-4 md:hidden">
        <Button className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-full shadow-xl">
          <Sparkles className="w-5 h-5 mr-2" />
          Add Custom Pooja
        </Button>
      </div>
    </div>
  );
};

export default PersonalizedPooja;
