import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Network, Loader2, Info } from "lucide-react";
import ConnectionStatus from "./ConnectionStatus";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";

export default function Header() {
  const { isAuthenticated, neuronId, login, logout, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setLocation("/")}>
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary">
                <Network className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold" data-testid="text-app-title">IC Governance</h1>
                <p className="text-xs text-muted-foreground">Network Nervous System</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/about")}
              className="gap-2 hidden sm:flex"
              data-testid="button-about-nav"
            >
              <Info className="h-4 w-4" />
              About
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <ConnectionStatus isConnected={isAuthenticated} neuronId={neuronId || undefined} />
            
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                disabled={isLoading}
                data-testid="button-disconnect"
                className="gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">Disconnect</span>
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={isLoading}
                data-testid="button-connect"
                className="gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
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
