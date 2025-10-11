import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { HelpCircle, Github, GraduationCap } from "lucide-react";
import Header from "@/components/Header";
import ProposalCard, { type Proposal } from "@/components/ProposalCard";
import FilterBar from "@/components/FilterBar";
import VoteModal from "@/components/VoteModal";
import HelpModal from "@/components/HelpModal";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  //todo: remove mock functionality - Using real proposal examples from docs
  const mockProposals: Proposal[] = [
    {
      id: "138130",
      title: "Internet Identity Canister Upgrade",
      proposer: "56c706b487ce455abcd0dc900bd2a902ee460208",
      deadline: "Dec 15, 2025",
      status: "Active",
      votesFor: 125000,
      votesAgainst: 45000,
      isVerified: true,
      topic: "Governance",
      type: "Canister Upgrade"
    },
    {
      id: "137938",
      title: "IC OS Version Election - Replica Upgrade",
      proposer: "dfinity-foundation",
      deadline: "Dec 20, 2025",
      status: "Active",
      votesFor: 198000,
      votesAgainst: 32000,
      isVerified: true,
      topic: "Network",
      type: "IC OS Election"
    },
    {
      id: "137937",
      title: "Node Provider Onboarding - New Data Center",
      proposer: "node-provider-xyz",
      deadline: "Dec 12, 2025",
      status: "Active",
      votesFor: 156000,
      votesAgainst: 34000,
      isVerified: true,
      topic: "Node Operators",
      type: "Node Provider"
    },
    {
      id: "137936",
      title: "Subnet Configuration Update - Participant Management",
      proposer: "registry-admin",
      deadline: "Nov 30, 2025",
      status: "Executed",
      votesFor: 215000,
      votesAgainst: 18000,
      isVerified: true,
      topic: "Subnet Management",
      type: "Participant Management"
    },
    {
      id: "129394",
      title: "Governance Canister WASM Verification Example",
      proposer: "f96d410adab829bee9ff7eac89697f71",
      deadline: "Nov 28, 2025",
      status: "Executed",
      votesFor: 245000,
      votesAgainst: 15000,
      isVerified: true,
      topic: "Governance",
      type: "Canister Upgrade"
    },
    {
      id: "140001",
      title: "NNS Governance Parameters Update",
      proposer: "community-proposal-xyz",
      deadline: "Jan 5, 2026",
      status: "Active",
      votesFor: 87000,
      votesAgainst: 95000,
      isVerified: false,
      topic: "Economics",
      type: "Participant Management"
    },
  ];

  const handleVote = (proposalId: string) => {
    const proposal = mockProposals.find(p => p.id === proposalId);
    if (proposal) {
      setSelectedProposal(proposal);
      setIsVoteModalOpen(true);
    }
  };

  const handleViewDetails = (proposalId: string) => {
    console.log("View details for proposal:", proposalId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold" data-testid="text-page-title">Active Proposals</h2>
              <p className="text-muted-foreground mt-1">
                Browse and vote on Network Nervous System governance proposals
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setLocation("/learn")}
                className="gap-2"
                data-testid="button-learn"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Learning Center</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsHelpModalOpen(true)}
                className="gap-2"
                data-testid="button-help"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Quick Guide</span>
              </Button>
            </div>
          </div>

          <FilterBar
            onStatusChange={(status) => console.log("Filter by status:", status)}
            onSearchChange={(search) => console.log("Search:", search)}
            onSortChange={(sort) => console.log("Sort by:", sort)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onVote={handleVote}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
            <Github className="h-4 w-4" />
            <span>Open source on GitHub</span>
            <span>•</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </main>

      {selectedProposal && (
        <VoteModal
          isOpen={isVoteModalOpen}
          onClose={() => {
            setIsVoteModalOpen(false);
            setSelectedProposal(null);
          }}
          proposalId={selectedProposal.id}
          proposalTitle={selectedProposal.title}
        />
      )}

      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  );
}
