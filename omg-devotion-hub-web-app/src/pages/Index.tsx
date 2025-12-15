import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Store,
  MapPin,
  BookOpen,
  Calendar,
  Music,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  Heart,
  Shield,
  Zap,
  Bell,
  ChevronRight,
  Star,
  Users,
  Globe,
  Smartphone
} from "lucide-react";
import heroImage from "@/assets/hero-ganesha.jpg";
import omSymbol from "@/assets/om-symbol.png";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  const notifications = [
    { icon: Bell, text: "🕉️ Today's Auspicious Time: 6:00 AM - 7:30 AM", color: "from-primary to-secondary" },
    { icon: Star, text: "✨ New: AI-powered Kundali matching now available!", color: "from-secondary to-accent" },
    { icon: Heart, text: "🙏 Join 50,000+ devotees on their spiritual journey", color: "from-accent to-divine-purple" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Store,
      title: "Divine Store",
      description: "Sacred items, rudraksha beads, and spiritual merchandise delivered to your doorstep",
      gradient: "from-primary to-secondary",
    },
    {
      icon: MapPin,
      title: "Temple Locator",
      description: "Find nearby temples with routes, timings, and live darshan availability",
      gradient: "from-secondary to-accent",
    },
    {
      icon: BookOpen,
      title: "Sacred Knowledge",
      description: "Complete history, mythology, and information about 10,000+ temples",
      gradient: "from-accent to-divine-crimson",
    },
    {
      icon: Calendar,
      title: "Personalized Pooja",
      description: "AI-recommended rituals based on your birth chart and planetary positions",
      gradient: "from-primary to-divine-purple",
    },
    {
      icon: Music,
      title: "Divine Music",
      description: "Curated devotional songs, mantras, and meditation sounds for your deity",
      gradient: "from-divine-orange to-primary",
    },
    {
      icon: MessageCircle,
      title: "AI Spiritual Guide",
      description: "24/7 guidance on rituals, mantras, and spiritual queries in your language",
      gradient: "from-divine-purple to-accent",
    },
  ];

  const whyUseApp = [
    {
      icon: Sparkles,
      title: "AI-enabled Real-Time Darshan Management",
      description: [
        "Live queue and waiting-time tracking through CCTV feeds.",
        "Faster, smoother darshan experiences with reduced backlogs and irregular wait times.",
        "Creating a world class devotee experience backed by technology.",
      ],
    },
    {
      icon: Shield,
      title: "AI-powered Spiritual OMG GPT",
      description: [
        "A one-stop spiritual consultation hub.",
        "Backed by hundreds of certified Chief Devotional Officers.",
        "Delivers in-depth spiritual guidance and personalized “spiritual prescriptions”.",
      ],
    },
    {
      icon: Zap,
      title: "Project R – The Sacred Rudraksh Revolution",
      description: [
        "Project R – The Sacred Rudraksh Revolution",
        {
          text: "These sacred Rudraksh will be available for pre-order at www.omgofficial.com.",
          link: "https://www.omgofficial.com",
        },
        "The Maha Yaagam will be performed on the auspicious night of Maha Shivaratri 2026.",
      ],
    },
    {
      icon: Heart,
      title: "OMG SEZ – Spiritual Experience Zones",
      description: [
        "A traveling spiritual festival across cities.",
        "Multiple experiences, one roof, a truly unique spiritual immersion.",
        // "Grow together through collective devotion",
      ],
    },
  ];

  const stats = [
    { value: "10,000+", label: "Temples Listed" },
    { value: "50,000+", label: "Active Devotees" },
    { value: "500+", label: "Verified Pandits" },
    { value: "1M+", label: "Poojas Completed" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: { duration: 6, repeat: Infinity }
    }
  };

  const DetailRow = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-gray-900 font-medium">{children}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom overflow-x-hidden">
      {/* Flash Notification Banner */}
      <AnimatePresence mode="wait">
        {showNotification && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] safe-top"
          >
            <div className={`bg-gradient-to-r ${notifications[currentNotification].color} py-2 px-4`}>
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <motion.div
                  key={currentNotification}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-2 text-primary-foreground text-sm font-medium"
                >
                  <Bell className="w-4 h-4 animate-pulse" />
                  <span>{notifications[currentNotification].text}</span>
                </motion.div>
                <button
                  onClick={() => setShowNotification(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed ${showNotification ? 'top-10' : 'top-0'} w-full bg-background/95 backdrop-blur-md z-50 border-b border-border/50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <img src={omSymbol} alt="OM" className="h-10 w-10 animate-pulse-soft" />
              <span className="text-2xl font-bold text-gradient-divine">OMG</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-6">
              {[
                { name: "Home", href: "/" },
                { name: "Temples", href: "/temples" },
                { name: "Store", href: "/store" },
                { name: "Features", href: "#features" },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.href.startsWith("/") ? (
                    <Link to={item.href}>
                      <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-primary/10 transition-all">
                        {item.name}
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-primary/10 transition-all">
                      {item.name}
                    </Button>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg">
                  Download App
                </Button>
              </motion.div>
            </div>

            <button
              className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border shadow-lg overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Temples", href: "/temples" },
                  { name: "Store", href: "/store" },
                  { name: "Features", href: "#features" },
                ].map((item) => (
                  item.href.startsWith("/") ? (
                    <Link key={item.name} to={item.href}>
                      <Button variant="ghost" className="w-full justify-start">{item.name}</Button>
                    </Link>
                  ) : (
                    <Button key={item.name} variant="ghost" className="w-full justify-start">{item.name}</Button>
                  )
                ))}
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  Download App
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className={`relative ${showNotification ? 'pt-32' : 'pt-24'} pb-12 md:pt-40 md:pb-20 overflow-hidden transition-all duration-300`}>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-celestial" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-accent/20 to-divine-purple/20 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
          >
            <div className="flex-1 text-center lg:text-left space-y-6">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm text-primary font-medium">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Spiritual Companion</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Your Divine Journey
                <motion.span
                  className="block text-gradient-divine"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Begins Here
                </motion.span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Experience spirituality like never before. Connect with temples, discover sacred rituals,
                and embark on a personalized devotional journey powered by ancient wisdom and modern AI.
              </motion.p>

              {/* App Store Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-xl h-14 px-6 gap-3 shadow-xl"
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Download on the</div>
                    <div className="text-base font-semibold -mt-0.5">App Store</div>
                  </div>
                </Button>
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-xl h-14 px-6 gap-3 shadow-xl"
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Get it on</div>
                    <div className="text-base font-semibold -mt-0.5">Google Play</div>
                  </div>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4">
                {stats.slice(0, 3).map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gradient-divine">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex-1 relative"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative"
              >
                {/* Phone Mockup */}
                <div className="relative mx-auto w-72 md:w-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-[3rem] blur-2xl opacity-40" />
                  <div className="relative bg-gradient-to-br from-foreground to-foreground/90 rounded-[3rem] p-2 shadow-2xl">
                    <div className="bg-background rounded-[2.5rem] overflow-hidden">
                      <img
                        src={heroImage}
                        alt="Divine Experience"
                        className="w-full h-[500px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-[2.5rem]" />

                      {/* Floating UI Elements */}
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-20 -right-4 bg-card/95 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-border"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Bell className="w-4 h-4 text-primary-foreground" />
                          </div>
                          <div className="text-xs">
                            <div className="font-semibold">Pooja Reminder</div>
                            <div className="text-muted-foreground">Ganesh Chaturthi at 5PM</div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="absolute bottom-32 -left-4 bg-card/95 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-border"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-primary-foreground" />
                          </div>
                          <div className="text-xs">
                            <div className="font-semibold">Nearest Temple</div>
                            <div className="text-muted-foreground">0.5 km away</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-20 h-20 border-2 border-primary/30 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-br from-accent/40 to-divine-purple/40 rounded-2xl blur-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* <section className="py-24 bg-[#FFF7ED] relative overflow-hidden"> */}
      <div className="py-28 bg-gradient-to-b from-[#FFF7ED] to-white">
        <div className="container mx-auto px-4">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-5">
              Maha Yaagam <span className="text-gradient-divine">1.0</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              OMG will debut with <strong>Maha Yaagam 1.0</strong>, the longest continual
              spiritual event on the planet, marking a historic moment in modern
              spiritual experiences.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

            {/* Event Details Card */}
            <div className="
        relative
        bg-white/80 backdrop-blur
        rounded-3xl
        p-10
        border border-orange-100
        shadow-[0_20px_60px_-20px_rgba(0,0,0,0.08)]
        space-y-8
      ">

              <div className="absolute left-0 top-10 h-24 w-1 bg-gradient-to-b from-orange-400 to-orange-200 rounded-full" />

              <DetailRow label="Dates">
                Feb 15–16, 2026{" "}
                <span className="text-sm text-gray-500">(Maha Shivaratri)</span>
              </DetailRow>

              <DetailRow label="Venue">
                Hotel Hills Convention Centre, Hosur
              </DetailRow>

              <DetailRow label="Duration">
                <span className="font-semibold text-gray-900">34 hours non-stop</span>
                <div className="text-sm text-gray-500 mt-1">
                  Feb 15, 8:00 AM – Feb 16, 6:00 PM
                </div>
              </DetailRow>

              <DetailRow label="Access">
                <span className="text-gray-900">Open to the public.</span>{" "}
                <a
                  href="https://www.omgofficial.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-orange-500 font-semibold underline underline-offset-4 hover:text-orange-600"
                >
                  Book slots at www.omgofficial.com
                </a>
              </DetailRow>
            </div>

            {/* Highlights Card */}
            <div className="
        bg-gradient-to-br from-orange-50 via-white to-white
        rounded-3xl
        p-10
        border border-orange-100
        shadow-[0_20px_60px_-20px_rgba(0,0,0,0.06)]
      ">

              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                Event Highlights
              </h3>

              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <p className="text-gray-700 leading-relaxed">
                    <strong>25 learned purohits</strong> chanting Rudram
                    <strong> 3,300 times</strong>
                  </p>
                </li>

                <li className="flex gap-4 items-start">
                  <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <p className="text-gray-700 leading-relaxed">
                    Attempting a <strong>Guinness World Record</strong> for the
                    <strong> Longest Chanting Marathon</strong>
                  </p>
                </li>

                <li className="flex gap-4 items-start">
                  <span className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <p className="text-gray-700 leading-relaxed">
                    Performed on the most auspicious night of
                    <strong> Maha Shivaratri</strong>
                  </p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>


      {/* Why Use This App Section */}
      <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <span className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-2 text-sm text-secondary font-medium">
              <Zap className="w-4 h-4" />
              Why Choose OMG
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Transform Your
              <span className="block text-gradient-divine">Spiritual Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We blend ancient wisdom with modern technology to create a seamless devotional journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {whyUseApp.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                  <div className="p-6 md:p-8 flex gap-5">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
                    >
                      <item.icon className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <ul className="space-y-1.5 text-muted-foreground leading-relaxed list-disc list-inside">
                        {item.description.map((point, i) => (
                          <li key={i}>
                            {typeof point === "string" ? (
                              point
                            ) : (
                              <>
                                {point.text.replace("www.omgofficial.com", "")}
                                <a
                                  href={point.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary underline underline-offset-4 hover:text-primary/80 font-medium"
                                >
                                  www.omgofficial.com
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        {/* </section> */}

      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <span className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-sm text-accent font-medium">
              <Globe className="w-4 h-4" />
              Comprehensive Features
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Everything You Need for Your
              <span className="block text-gradient-divine">Sacred Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete ecosystem designed to enhance every aspect of your spiritual life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group h-full relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                  <div className="p-6 space-y-4 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </motion.div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all gap-2"
                    >
                      Explore
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  <motion.div
                    className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Journey Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <span className="inline-flex items-center gap-2 bg-divine-purple/10 border border-divine-purple/20 rounded-full px-4 py-2 text-sm text-divine-purple font-medium">
                <Heart className="w-4 h-4" />
                Your Divine Enabler
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Unlock the Path to
                <span className="block text-gradient-divine">Spiritual Awakening</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                OMG is more than an app – it's your personal gateway to divine experiences.
                We understand that spirituality is deeply personal, which is why every feature
                is designed to adapt to your unique spiritual journey.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "Personalized deity recommendations based on your birth chart",
                  "Daily mantras and rituals curated just for you",
                  "Connect with authentic pandits for online ceremonies",
                  "Track your spiritual progress and milestone achievements"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg mt-4 shadow-xl">
                  Begin Your Journey
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-3xl border-2 border-dashed border-primary/30"
                />
                <div className="grid grid-cols-2 gap-4 p-8">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-gradient-divine mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="relative overflow-hidden border-2 border-primary/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl"
              />

              <div className="relative p-8 md:p-12 text-center space-y-6">
                <motion.img
                  src={omSymbol}
                  alt="Om"
                  className="w-20 h-20 mx-auto"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Begin Your Divine Journey?
                </h2>

                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Download OMG now and join thousands of devotees experiencing spirituality in a whole new way
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    size="lg"
                    className="bg-foreground text-background hover:bg-foreground/90 rounded-xl h-14 px-6 gap-3 shadow-xl"
                  >
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs opacity-80">Download on the</div>
                      <div className="text-base font-semibold -mt-0.5">App Store</div>
                    </div>
                  </Button>
                  <Button
                    size="lg"
                    className="bg-foreground text-background hover:bg-foreground/90 rounded-xl h-14 px-6 gap-3 shadow-xl"
                  >
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-xs opacity-80">Get it on</div>
                      <div className="text-base font-semibold -mt-0.5">Google Play</div>
                    </div>
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>50K+ Downloads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span>4.9 Rating</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-muted/30 safe-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img src={omSymbol} alt="OM" className="h-10 w-10" />
                <span className="text-2xl font-bold text-gradient-divine">OMG</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Your AI-powered spiritual companion. Experience divine connections, discover sacred temples,
                and embark on a personalized devotional journey.
              </p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline" className="rounded-full">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" /></svg>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Features</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="hover:text-primary cursor-pointer transition-colors">Temple Locator</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Divine Store</p>
                <p className="hover:text-primary cursor-pointer transition-colors">AI Guide</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Pooja Booking</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="hover:text-primary cursor-pointer transition-colors">About Us</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Terms of Service</p>
                <p className="hover:text-primary cursor-pointer transition-colors">Contact</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center">
              © 2024 OMG - Oh My God. Bringing divine experiences to life.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Smartphone className="w-4 h-4" />
              <span>Made with 🙏 for devotees worldwide</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;