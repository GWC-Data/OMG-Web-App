import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  ArrowRight, 
  Eye, 
  EyeOff,
  Calendar,
  User,
  Heart,
  Sparkles,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import omSymbol from "@/assets/om-symbol.png";

type AuthStep = "method" | "credentials" | "profile";

const Auth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [step, setStep] = useState<AuthStep>("method");
  const [authMethod, setAuthMethod] = useState<"phone" | "email" | "google">("phone");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form data
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [maritalStatus, setMaritalStatus] = useState<"single" | "married" | "divorced" | "widowed">("single");

  const handleMethodSelect = (method: "phone" | "email" | "google") => {
    setAuthMethod(method);
    if (method === "google") {
      // Simulate Google auth
      toast({
        title: "Google Sign-In",
        description: "Connecting to Google...",
      });
      setTimeout(() => {
        setStep("profile");
      }, 1000);
    } else {
      setStep("credentials");
    }
  };

  const handleCredentialsSubmit = () => {
    if (authMethod === "phone" && !phone) {
      toast({ title: "Please enter your phone number", variant: "destructive" });
      return;
    }
    if (authMethod === "email" && (!email || !password)) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    
    if (isLogin) {
      // Simulate login
      login({
        id: "1",
        phone: phone || undefined,
        email: email || undefined,
        fullName: "Devotee",
        dateOfBirth: "1990-01-01",
        gender: "male",
        maritalStatus: "single",
      });
      navigate("/");
    } else {
      setStep("profile");
    }
  };

  const handleProfileSubmit = () => {
    if (!fullName || !dateOfBirth) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    
    login({
      id: "1",
      phone: phone || undefined,
      email: email || undefined,
      fullName,
      dateOfBirth,
      gender,
      maritalStatus,
    });
    
    toast({
      title: "Welcome to OMG! 🙏",
      description: "Your spiritual journey begins now.",
    });
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-secondary/30 to-accent/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          {step !== "method" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setStep(step === "profile" ? "credentials" : "method")}
              className="mr-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          )}
          <motion.img
            src={omSymbol}
            alt="OM"
            className="h-12 w-12"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="ml-3">
            <h1 className="text-2xl font-bold text-gradient-divine">OMG</h1>
            <p className="text-xs text-muted-foreground">Oh My God</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Auth Method Selection */}
          {step === "method" && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Begin Your Sacred Journey</h2>
                <p className="text-muted-foreground">
                  Connect with the divine through OMG
                </p>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMethodSelect("phone")}
                  className="w-full p-4 rounded-2xl glass-card flex items-center gap-4 text-left hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Continue with Phone</p>
                    <p className="text-sm text-muted-foreground">Quick OTP verification</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMethodSelect("email")}
                  className="w-full p-4 rounded-2xl glass-card flex items-center gap-4 text-left hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Continue with Email</p>
                    <p className="text-sm text-muted-foreground">Use email & password</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMethodSelect("google")}
                  className="w-full p-4 rounded-2xl glass-card flex items-center gap-4 text-left hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-border">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Continue with Google</p>
                    <p className="text-sm text-muted-foreground">Fast & secure</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          )}

          {/* Step 2: Credentials */}
          {step === "credentials" && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-muted-foreground">
                  {authMethod === "phone" 
                    ? "Enter your phone number to continue"
                    : "Enter your email and password"}
                </p>
              </div>

              <div className="space-y-4">
                {authMethod === "phone" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>
                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="otp">OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          className="h-12 text-center tracking-widest"
                          maxLength={6}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pr-10 h-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Button
                onClick={handleCredentialsSubmit}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                {isLogin ? "Sign In" : "Continue"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-center text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-semibold hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </motion.div>
          )}

          {/* Step 3: Profile Setup */}
          {step === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Complete Your Profile</h2>
                <p className="text-muted-foreground">
                  Help us personalize your spiritual journey
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="dob"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <RadioGroup
                    value={gender}
                    onValueChange={(value: "male" | "female" | "other") => setGender(value)}
                    className="flex gap-4"
                  >
                    {[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ].map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marital">Marital Status</Label>
                  <Select value={maritalStatus} onValueChange={(value: any) => setMaritalStatus(value)}>
                    <SelectTrigger className="h-12">
                      <Heart className="w-5 h-5 mr-2 text-muted-foreground" />
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleProfileSubmit}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Start My Journey
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
