import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface VerificationPanelProps {
  proposalId: string;
  contentHash: string;
  onChainHash: string;
  isVerified: boolean;
}

export default function VerificationPanel({ 
  proposalId, 
  contentHash, 
  onChainHash, 
  isVerified 
}: VerificationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied`,
    });
  };

  return (
    <Card className="p-6" data-testid={`verification-panel-${proposalId}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">On-Chain Verification</h3>
            {isVerified && (
              <Badge className="gap-1.5 bg-chart-2 hover:bg-chart-2" data-testid="badge-verified">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid="button-toggle-verification"
            className="gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show Details
              </>
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Content Hash</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(contentHash, "Content hash")}
                  data-testid="button-copy-content-hash"
                  className="h-8 gap-2"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </Button>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <code className="text-xs font-mono break-all" data-testid="text-content-hash">
                  {contentHash}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">On-Chain Hash</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(onChainHash, "On-chain hash")}
                  data-testid="button-copy-onchain-hash"
                  className="h-8 gap-2"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </Button>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <code className="text-xs font-mono break-all" data-testid="text-onchain-hash">
                  {onChainHash}
                </code>
              </div>
            </div>

            {isVerified && (
              <div className="bg-chart-2/10 border border-chart-2/20 p-3 rounded-md">
                <p className="text-sm text-chart-2">
                  ✓ Hashes match! This proposal's content has been verified against on-chain data.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
