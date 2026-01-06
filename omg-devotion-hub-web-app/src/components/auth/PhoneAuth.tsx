import { useState } from "react";
import { Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { generalPostFunction } from "@/utils/commonApiCallFun";

interface PhoneAuthProps {
  onVerified: (phoneNumber: string, userId: string) => void;
}

interface VerifyOtpResponse {
  data: {
    data: {
      user: {
        id: string;
      };
    };
  };
}

const PhoneAuth = ({ onVerified }: PhoneAuthProps) => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, "");
    // Only allow if it starts with 6-9 or is empty
    if (digitsOnly === "" || /^[6-9]/.test(digitsOnly)) {
      // Limit to 10 digits
      const limitedValue = digitsOnly.slice(0, 10);
      setPhoneNumber(limitedValue);
    }
  };

  const handleSendOtp = async () => {
    const phoneRegex = /^[6-9]\d{9}$/; // Standard Indian mobile number pattern
    if (
      !phoneNumber ||
      phoneNumber.length !== 10 ||
      !phoneRegex.test(phoneNumber)
    ) {
      toast({
        title: "Invalid phone number",
        description:
          "Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9",
        variant: "destructive",
      });
      return;
    }
    setIsOtpLoading(true);
    try {
      const payload = {
        phoneNumber: `+91${phoneNumber}`,
        templateId: "SEND_OTP",
        channel: "whatsapp",
      };
      const response = await generalPostFunction(
        "/auth/whatsapp/otp",
        payload,
        undefined,
        "https://omg-identity-service-993414851442.asia-south1.run.app"
      );
      if (response.status === 200 || response.status === 201) {
        setIsOtpSent(true);
        toast({
          title: "OTP Sent!",
          description: "Please enter the OTP sent to your phone",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid OTP",
        variant: "destructive",
      });
      return;
    }
    setIsOtpVerified(true);
    try {
      const payload = {
        phoneNumber: `+91${phoneNumber}`,
        otp: otp,
        channel: "whatsapp",
      };

      const response = await generalPostFunction<VerifyOtpResponse>(
        "/auth/whatsapp/verify",
        payload,
        undefined,
        "https://omg-identity-service-993414851442.asia-south1.run.app"
      );
      console.log("response", response);
      if (response.status === 200 || response.status === 201) {
        const trimmedPhone = phoneNumber.trim();
        const userId = response.data?.data?.user?.id;
        if (userId) {
          onVerified(trimmedPhone, userId);
          toast({
            title: "OTP Verified!",
            description: "You can now proceed to the next step",
          });
        } else {
          throw new Error("User ID not found in response");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Invalid OTP or something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsOtpVerified(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-foreground flex items-center gap-1.5">
          <Phone className="w-4 h-4 text-primary" /> Phone Number
        </Label>
        <div className="flex gap-3">
          <Input
            id="phone"
            type="tel"
            placeholder="Enter 10-digit number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="flex-1 h-12"
            maxLength={10}
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            disabled={isOtpSent}
          />
          <Button
            onClick={handleSendOtp}
            disabled={isOtpSent || isOtpLoading || phoneNumber.length !== 10}
            className="h-12 px-4 whitespace-nowrap bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            {isOtpSent ? (
              "Sent"
            ) : isOtpLoading ? (
              <>
                Sending...
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              </>
            ) : (
              "Get OTP"
            )}
          </Button>
        </div>
      </div>

      {isOtpSent && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="h-12 text-center tracking-widest text-lg"
              maxLength={6}
              inputMode="numeric"
            />
          </div>
          <Button
            className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={handleVerifyOtp}
            disabled={isOtpVerified || otp.length < 4}
          >
            {isOtpVerified ? (
              <>
                Verifying...
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              </>
            ) : (
              "Verify & Continue"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PhoneAuth;

