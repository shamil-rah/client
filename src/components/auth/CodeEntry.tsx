import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Shield } from "lucide-react";

interface CodeEntryProps {
  onCodeValidated: (code: string) => void;
}

export const CodeEntry: React.FC<CodeEntryProps> = ({ onCodeValidated }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (code === "SOUNDWAVE2024" || code === "FUNNELMARKET2024") {
      onCodeValidated(code);
    } else {
      setError("Invalid code. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl px-4 sm:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 border border-white/10 rounded mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 font-cinzel">
            ENTER SECRET CODE
          </h1>
          <p className="text-gray-400 font-josefin">
            Access exclusive content with your invitation code<br/>
            <span className="text-sm text-gray-500 mt-2 block">
              Use SOUNDWAVE2024 for music app or FUNNELMARKET2024 for marketplace
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Secret Code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter your code here"
            error={error}
            className="text-center text-lg tracking-widest"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={!code || isLoading}
          >
            {isLoading ? "Validating..." : "Continue"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-josefin">
            Don't have a code? Contact the administrator for access.
          </p>
        </div>
      </div>
    </div>
  );
};
