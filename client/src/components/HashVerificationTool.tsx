import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Copy, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HashVerificationTool() {
  const [gitHash, setGitHash] = useState("");
  const [localWasmHash, setLocalWasmHash] = useState("");
  const [proposalWasmHash, setProposalWasmHash] = useState("");
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleVerify = () => {
    if (!localWasmHash || !proposalWasmHash) {
      toast({
        title: "Missing hashes",
        description: "Please enter both WASM hashes to compare",
        variant: "destructive",
      });
      return;
    }

    const match = localWasmHash.toLowerCase().trim() === proposalWasmHash.toLowerCase().trim();
    setIsVerified(match);

    toast({
      title: match ? "Hashes Match! ✓" : "Hashes Do Not Match ✗",
      description: match 
        ? "The proposal has been verified successfully"
        : "Warning: The hashes do not match. Do not approve this proposal.",
      variant: match ? "default" : "destructive",
    });
  };

  const handleReset = () => {
    setGitHash("");
    setLocalWasmHash("");
    setProposalWasmHash("");
    setIsVerified(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Hash copied to clipboard",
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Hash Verification Tool</h2>
          <p className="text-muted-foreground mt-1">
            Compare proposal hashes to verify authenticity
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="git-hash">Git Commit Hash (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="git-hash"
                placeholder="e.g., a1b2c3d4e5f67890abcdef..."
                value={gitHash}
                onChange={(e) => setGitHash(e.target.value)}
                className="font-mono text-sm"
                data-testid="input-git-hash"
              />
              {gitHash && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(gitHash)}
                  data-testid="button-copy-git"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              The Git commit from which the canister was built
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="local-hash">Local WASM Hash</Label>
            <div className="flex gap-2">
              <Input
                id="local-hash"
                placeholder="Hash of the WASM you built locally..."
                value={localWasmHash}
                onChange={(e) => setLocalWasmHash(e.target.value)}
                className="font-mono text-sm"
                data-testid="input-local-hash"
              />
              {localWasmHash && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(localWasmHash)}
                  data-testid="button-copy-local"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proposal-hash">Proposal WASM Hash</Label>
            <div className="flex gap-2">
              <Input
                id="proposal-hash"
                placeholder="Hash from the proposal..."
                value={proposalWasmHash}
                onChange={(e) => setProposalWasmHash(e.target.value)}
                className="font-mono text-sm"
                data-testid="input-proposal-hash"
              />
              {proposalWasmHash && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(proposalWasmHash)}
                  data-testid="button-copy-proposal"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {isVerified !== null && (
          <div className={`p-4 rounded-md border ${
            isVerified 
              ? 'bg-chart-2/10 border-chart-2/20' 
              : 'bg-destructive/10 border-destructive/20'
          }`}>
            <div className="flex items-start gap-3">
              {isVerified ? (
                <CheckCircle2 className="h-5 w-5 text-chart-2 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className={`font-semibold ${isVerified ? 'text-chart-2' : 'text-destructive'}`}>
                  {isVerified ? 'Verification Successful' : 'Verification Failed'}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {isVerified 
                    ? 'The hashes match! This proposal has been verified.'
                    : 'The hashes do not match. This proposal may be compromised.'
                  }
                </p>
              </div>
              <Badge className={isVerified ? 'bg-chart-2 hover:bg-chart-2' : 'bg-destructive hover:bg-destructive'}>
                {isVerified ? 'Verified' : 'Failed'}
              </Badge>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button 
            onClick={handleVerify} 
            className="flex-1"
            data-testid="button-verify"
          >
            Verify Hashes
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="gap-2"
            data-testid="button-reset"
          >
            <RotateCw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}
