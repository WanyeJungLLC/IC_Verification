import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, Clock, AlertCircle, ExternalLink, Copy, ShieldCheck } from "lucide-react";
import { Proposal } from "./ProposalCard";
import { useToast } from "@/hooks/use-toast";

interface ProposalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposal: Proposal;
  onVote?: () => void;
}

const statusConfig = {
  Active: { icon: Clock, color: "bg-chart-3 hover:bg-chart-3", text: "text-chart-3" },
  Executed: { icon: CheckCircle2, color: "bg-chart-2 hover:bg-chart-2", text: "text-chart-2" },
  Rejected: { icon: XCircle, color: "bg-destructive hover:bg-destructive", text: "text-destructive" },
  Pending: { icon: AlertCircle, color: "bg-muted hover:bg-muted", text: "text-muted-foreground" },
};

export default function ProposalDetailsModal({ 
  isOpen, 
  onClose, 
  proposal,
  onVote 
}: ProposalDetailsModalProps) {
  const { toast } = useToast();
  const StatusIcon = statusConfig[proposal.status].icon;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  // Mock verification data - in real app would come from on-chain
  // For demo purposes, mismatched hashes are shown for unverified proposals
  const gitCommit = "a1b2c3d4e5f67890abcdef1234567890abcdef12";
  const verifiedWasmHash = "d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5";
  const unverifiedWasmHash = "MISMATCH1234567890abcdef1234567890abcdef1234567890abcdef12345678";
  
  const verificationData = {
    gitCommit,
    wasmHash: proposal.isVerified ? verifiedWasmHash : unverifiedWasmHash,
    proposalHash: verifiedWasmHash,
    isVerified: proposal.isVerified,
  };

  const hashesMatch = verificationData.wasmHash === verificationData.proposalHash;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-testid="modal-proposal-details">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className="font-mono shrink-0">
              #{proposal.id}
            </Badge>
            <Badge className={`gap-1.5 shrink-0 ${statusConfig[proposal.status].color}`}>
              <StatusIcon className="h-3 w-3" />
              {proposal.status}
            </Badge>
            {proposal.isVerified && (
              <Badge className="gap-1.5 shrink-0 bg-chart-2 hover:bg-chart-2">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-2xl font-bold" data-testid="text-proposal-title">
              {proposal.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-muted/50">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Type</p>
                  <Badge variant="outline" data-testid="badge-proposal-type">
                    {proposal.type}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Topic</p>
                  <Badge variant="secondary" data-testid="badge-proposal-topic">
                    {proposal.topic}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Deadline</p>
                  <p className="font-medium" data-testid="text-proposal-deadline">
                    {proposal.deadline}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Proposer</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-background px-2 py-1 rounded flex-1 truncate" data-testid="text-proposer-id">
                      {proposal.proposer}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(proposal.proposer, "Proposer ID")}
                      data-testid="button-copy-proposer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Votes For</p>
                    <p className="font-semibold text-chart-2" data-testid="text-votes-for">
                      {proposal.votesFor.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Votes Against</p>
                    <p className="font-semibold text-destructive" data-testid="text-votes-against">
                      {proposal.votesAgainst.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              On-Chain Verification
            </h4>
            
            <Card className={`p-4 border-2 ${
              hashesMatch 
                ? 'bg-chart-2/10 border-chart-2/20' 
                : 'bg-destructive/10 border-destructive/20'
            }`}>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  {hashesMatch ? (
                    <CheckCircle2 className="h-5 w-5 text-chart-2 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h5 className={`font-semibold ${hashesMatch ? 'text-chart-2' : 'text-destructive'}`}>
                      {hashesMatch ? 'Hash Verification Successful' : 'Hash Verification Failed'}
                    </h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      {hashesMatch 
                        ? 'The proposal WASM hash matches the on-chain hash. This proposal has been verified.'
                        : 'WARNING: The hashes do not match. This proposal may be compromised.'
                      }
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Git Commit Hash</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background px-3 py-2 rounded flex-1 break-all font-mono" data-testid="text-git-hash">
                        {verificationData.gitCommit}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(verificationData.gitCommit, "Git commit")}
                        data-testid="button-copy-git-hash"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Local Build WASM Hash</p>
                    <div className="flex items-center gap-2">
                      <code className={`text-xs bg-background px-3 py-2 rounded flex-1 break-all font-mono ${
                        !hashesMatch ? 'text-destructive' : ''
                      }`} data-testid="text-local-wasm-hash">
                        {verificationData.wasmHash}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(verificationData.wasmHash, "Local hash")}
                        data-testid="button-copy-local-hash"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">On-Chain WASM Hash</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background px-3 py-2 rounded flex-1 break-all font-mono" data-testid="text-proposal-wasm-hash">
                        {verificationData.proposalHash}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(verificationData.proposalHash, "Proposal hash")}
                        data-testid="button-copy-proposal-hash"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {proposal.type === "Canister Upgrade" && (
                    <div className="bg-background/50 p-3 rounded-md">
                      <p className="text-xs text-muted-foreground mb-2">
                        To verify this proposal locally:
                      </p>
                      <code className="text-xs block bg-muted px-2 py-1 rounded font-mono">
                        git clone https://github.com/dfinity/ic && git checkout {verificationData.gitCommit.slice(0, 8)}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <Separator />

          <div className="flex gap-3 flex-wrap">
            <Button
              variant="outline"
              onClick={() => window.open(`https://dashboard.internetcomputer.org/proposal/${proposal.id}`, '_blank')}
              className="gap-2"
              data-testid="button-view-on-chain"
            >
              View on IC Dashboard
              <ExternalLink className="h-4 w-4" />
            </Button>
            
            {proposal.status === "Active" && onVote && (
              <Button 
                onClick={onVote}
                className="flex-1"
                data-testid="button-vote-from-details"
              >
                Vote on Proposal
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
