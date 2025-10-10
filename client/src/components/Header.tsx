import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Network } from "lucide-react";
import ConnectionStatus from "./ConnectionStatus";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [neuronId, setNeuronId] = useState<string>();

  const handleConnect = () => {
    console.log("Internet Identity login triggered");
    setIsConnected(true);
    setNeuronId("1234567890abcdef");
  };

  const handleDisconnect = () => {
    console.log("Disconnect triggered");
    setIsConnected(false);
    setNeuronId(undefined);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary">
              <Network className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold" data-testid="text-app-title">IC Governance</h1>
              <p className="text-xs text-muted-foreground">Network Nervous System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ConnectionStatus isConnected={isConnected} neuronId={neuronId} />
            
            {isConnected ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                data-testid="button-disconnect"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Disconnect</span>
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleConnect}
                data-testid="button-connect"
                className="gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Connect Identity</span>
              </Button>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
