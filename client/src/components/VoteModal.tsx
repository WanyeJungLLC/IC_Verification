import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Minus, Loader2 } from "lucide-react";
import { useState } from "react";

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

  const handleVoteSelect = (choice: VoteChoice) => {
    setVoteChoice(choice);
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("signing");
    setTimeout(() => {
      setStep("success");
    }, 2000);
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
            <div className="grid grid-cols-3 gap-3">
              {voteOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="flex-col h-24 gap-2"
                  onClick={() => handleVoteSelect(option.value)}
                  data-testid={`button-vote-${option.value}`}
                >
                  <option.icon className="h-6 w-6" />
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
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
