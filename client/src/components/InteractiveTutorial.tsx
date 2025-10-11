import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";

const tutorialSteps = [
  {
    title: "Understanding Proposal Types",
    content: "There are 4 main proposal types that require verification: Canister Upgrades, IC OS Elections, Node Provider changes, and Participant Management. Each has specific verification requirements.",
    action: "Learn about each type in the Proposal Types tab",
    example: "Proposal #138130 (Internet Identity Upgrade)"
  },
  {
    title: "Reading a Proposal",
    content: "Every proposal includes: a unique ID, title, proposer information, deadline, Git commit hash (for code changes), and WASM hash (for canister upgrades). These hashes are critical for verification.",
    action: "Check the proposal details for hashes",
    example: "Look for 'Git Commit' and 'WASM Hash' fields"
  },
  {
    title: "Setting Up Your Environment",
    content: "To verify proposals, you need: Git, Rust, DFX SDK, and Podman/Docker. Follow the installation scripts in the documentation to set up your local environment.",
    action: "Install required tools from the setup guide",
    example: "Run: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
  },
  {
    title: "Building from Source",
    content: "Clone the IC repository, checkout the exact Git commit from the proposal, and build the canister following the repo instructions. This produces a local WASM binary.",
    action: "Clone repo and build locally",
    example: "git checkout <commit-hash> && ./build.sh"
  },
  {
    title: "Calculating Hashes",
    content: "Calculate the SHA-256 hash of your locally built WASM binary using shasum or sha256sum. This hash should match the one in the proposal exactly.",
    action: "Run: shasum -a 256 <your-wasm-file>",
    example: "Output: d2a4f3c9e7b1a8c4f5e6d9a2b3c4d5..."
  },
  {
    title: "Comparing Hashes",
    content: "Compare your calculated hash with the proposal hash. They must match character-for-character. Even one difference means the proposal is not verified and should be rejected.",
    action: "Use the Hash Verification Tool",
    example: "Local: abc123... vs Proposal: abc123... ✓ MATCH"
  },
  {
    title: "Voting with Confidence",
    content: "Once verified, you can vote with confidence knowing the proposal is authentic. If hashes don't match, vote to reject and alert the community. Your verification protects the network.",
    action: "Cast your vote on verified proposals",
    example: "Adopt, Reject, or Abstain based on verification"
  },
  {
    title: "Sharing Your Results",
    content: "Document your verification results and share them with the community on the IC Forum or GitHub. This builds transparency and helps others learn the verification process.",
    action: "Post your findings to the forum",
    example: "Upload verification report to GitHub"
  }
];

export default function InteractiveTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  const step = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Interactive Verification Tutorial</h2>
            <Badge variant="outline">
              Step {currentStep + 1} of {tutorialSteps.length}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {tutorialSteps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleStepClick(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors shrink-0 ${
                idx === currentStep 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : completedSteps.includes(idx)
                  ? 'bg-chart-2/10 border-chart-2/20'
                  : 'bg-muted/50 border-border'
              }`}
              data-testid={`button-step-${idx}`}
            >
              {completedSteps.includes(idx) ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
              <span className="text-sm">{idx + 1}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.content}</p>
          </div>

          <Card className="p-4 bg-primary/10 border-primary/20">
            <h4 className="font-semibold mb-2">Action Required</h4>
            <p className="text-sm">{step.action}</p>
          </Card>

          <Card className="p-4 bg-muted/50">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Example
            </h4>
            <p className="text-sm text-muted-foreground font-mono">{step.example}</p>
          </Card>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="gap-2"
            data-testid="button-prev-step"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === tutorialSteps.length - 1}
            className="flex-1 gap-2"
            data-testid="button-next-step"
          >
            {currentStep === tutorialSteps.length - 1 ? 'Complete' : 'Next Step'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {currentStep === tutorialSteps.length - 1 && (
          <div className="bg-chart-2/10 border border-chart-2/20 p-4 rounded-md">
            <h4 className="font-semibold text-chart-2 mb-2">🎉 Tutorial Complete!</h4>
            <p className="text-sm text-muted-foreground">
              You're now ready to verify proposals on the Internet Computer. Remember: always verify before voting!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
