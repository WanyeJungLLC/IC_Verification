import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogIn, Search, Vote, CheckCircle } from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const steps = [
    {
      number: 1,
      icon: LogIn,
      title: "Connect Your Identity",
      description: "Click 'Connect Identity' and authenticate using Internet Identity or your neuron ID. This enables secure, client-side signing of votes.",
    },
    {
      number: 2,
      icon: Search,
      title: "Browse Proposals",
      description: "Review active governance proposals. Each shows verification status, voting deadline, and current vote counts. Click 'View Details' for full proposal content.",
    },
    {
      number: 3,
      icon: Vote,
      title: "Cast Your Vote",
      description: "Select 'Vote Now' on active proposals. Choose Adopt, Reject, or Abstain. Confirm your choice and sign the transaction in your wallet.",
    },
    {
      number: 4,
      icon: CheckCircle,
      title: "Verify On-Chain",
      description: "All votes are recorded on-chain with verifiable hashes. Expand the verification panel to compare content hashes and ensure data integrity.",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-help">
        <DialogHeader>
          <DialogTitle>How to Vote on IC Governance</DialogTitle>
          <DialogDescription>
            A step-by-step guide for first-time voters
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex gap-4">
              <div className="shrink-0">
                <Badge className="h-8 w-8 rounded-full p-0 flex items-center justify-center" data-testid={`badge-step-${step.number}`}>
                  {step.number}
                </Badge>
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <step.icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold" data-testid={`text-step-title-${step.number}`}>{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground" data-testid={`text-step-desc-${step.number}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}

          <div className="bg-muted/50 p-4 rounded-md space-y-2">
            <h4 className="font-semibold text-sm">Important Notes</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All transactions are signed client-side for maximum security</li>
              <li>• Proposal hashes are verified against on-chain data</li>
              <li>• Your vote is final once submitted to the blockchain</li>
              <li>• This app is open-source and forkable on GitHub</li>
            </ul>
          </div>

          <Button onClick={onClose} className="w-full" data-testid="button-got-it">
            Got it, take me to proposals
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
