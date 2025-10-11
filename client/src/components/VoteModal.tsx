import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Minus, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
  proposalTitle: string;
}

type VoteChoice = "adopt" | "reject" | "abstain" | null;
type VoteStep = "select" | "confirm" | "signing" | "success";

export default function VoteModal({ isOpen, onClose, proposalId, proposalTitle }: VoteModalProps) {
  const [voteChoice, setVoteChoice] = useState<VoteChoice>(null);
  const [step, setStep] = useState<VoteStep>("select");
  const { isAuthenticated, neuronId, login } = useAuth();
  const { toast } = useToast();

  const handleVoteSelect = (choice: VoteChoice) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please connect your Internet Identity to vote",
        variant: "destructive",
      });
      return;
    }
    setVoteChoice(choice);
    setStep("confirm");
  };

  const handleConfirm = async () => {
    setStep("signing");
    
    // Simulate IC governance canister call
    try {
      // In real app: await governanceCanister.vote(proposalId, voteChoice, neuronId)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep("success");
      
      toast({
        title: "Vote Submitted Successfully",
        description: `Your ${voteChoice} vote has been recorded on-chain`,
      });
    } catch (error) {
      toast({
        title: "Vote Failed",
        description: "Failed to submit vote. Please try again.",
        variant: "destructive",
      });
      setStep("confirm");
    }
  };

  const handleClose = () => {
    setVoteChoice(null);
    setStep("select");
    onClose();
  };

  const voteOptions = [
    { value: "adopt" as const, label: "Adopt", icon: ThumbsUp, color: "bg-chart-2 hover:bg-chart-2" },
    { value: "reject" as const, label: "Reject", icon: ThumbsDown, color: "bg-destructive hover:bg-destructive" },
    { value: "abstain" as const, label: "Abstain", icon: Minus, color: "bg-muted hover:bg-muted" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-vote">
        <DialogHeader>
          <DialogTitle>Cast Your Vote</DialogTitle>
          <DialogDescription className="line-clamp-2">{proposalTitle}</DialogDescription>
          <Badge variant="outline" className="font-mono text-xs w-fit mt-2" data-testid="badge-proposal-id">
            Proposal #{proposalId}
          </Badge>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2">
            {["Select", "Confirm", "Sign", "Submit"].map((label, index) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full transition-colors ${
                    step === "select" && index === 0 ? "bg-primary" :
                    step === "confirm" && index === 1 ? "bg-primary" :
                    step === "signing" && index === 2 ? "bg-primary" :
                    step === "success" && index === 3 ? "bg-primary" :
                    "bg-muted"
                  }`}
                  data-testid={`step-indicator-${index}`}
                />
                {index < 3 && <div className="h-px w-8 bg-muted" />}
              </div>
            ))}
          </div>

          {step === "select" && (
            <>
              {!isAuthenticated && (
                <Card className="p-4 bg-chart-3/10 border-chart-3/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-chart-3 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">Authentication Required</h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        Connect your Internet Identity to vote on proposals
                      </p>
                      <Button size="sm" onClick={login} data-testid="button-connect-to-vote">
                        Connect Identity
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
              
              {isAuthenticated && neuronId && (
                <Card className="p-3 bg-chart-2/10 border-chart-2/20">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-chart-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Voting with Neuron</p>
                      <code className="text-xs font-mono truncate block" data-testid="text-voting-neuron">
                        {neuronId}
                      </code>
                    </div>
                  </div>
                </Card>
              )}
              
              <div className="grid grid-cols-3 gap-3">
                {voteOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className="flex-col h-24 gap-2"
                    onClick={() => handleVoteSelect(option.value)}
                    disabled={!isAuthenticated}
                    data-testid={`button-vote-${option.value}`}
                  >
                    <option.icon className="h-6 w-6" />
                    <span>{option.label}</span>
                  </Button>
                ))}
              </div>
            </>
          )}

          {step === "confirm" && voteChoice && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Your Vote</span>
                  <Badge 
                    className={voteOptions.find(o => o.value === voteChoice)?.color}
                    data-testid="badge-vote-choice"
                  >
                    {voteChoice.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Proposal</span>
                  <span className="text-sm font-mono">#{proposalId}</span>
                </div>
                {neuronId && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Neuron ID</span>
                    <code className="text-xs font-mono bg-background px-2 py-1 rounded">{neuronId}</code>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setStep("select")}
                  className="flex-1"
                  data-testid="button-back"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleConfirm}
                  className="flex-1"
                  data-testid="button-confirm-vote"
                >
                  Confirm Vote
                </Button>
              </div>
            </div>
          )}

          {step === "signing" && (
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" data-testid="icon-loading" />
              <div className="space-y-1">
                <p className="font-medium">Signing transaction...</p>
                <p className="text-sm text-muted-foreground">
                  Please approve in your Internet Identity
                </p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-chart-2/10 flex items-center justify-center mx-auto">
                <ThumbsUp className="h-6 w-6 text-chart-2" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-lg">Vote Submitted!</p>
                <p className="text-sm text-muted-foreground">
                  Your vote has been recorded on-chain
                </p>
              </div>
              <Button onClick={handleClose} className="w-full" data-testid="button-close">
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
