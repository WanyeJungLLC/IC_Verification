import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, Github } from "lucide-react";
import Header from "@/components/Header";
import ProposalCard, { type Proposal } from "@/components/ProposalCard";
import FilterBar from "@/components/FilterBar";
import VoteModal from "@/components/VoteModal";
import HelpModal from "@/components/HelpModal";

export default function Home() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  //todo: remove mock functionality
  const mockProposals: Proposal[] = [
    {
      id: "12345",
      title: "Upgrade NNS Governance Canister to Version 2.0",
      proposer: "abc123def456ghi789",
      deadline: "Dec 15, 2025",
      status: "Active",
      votesFor: 125000,
      votesAgainst: 45000,
      isVerified: true,
      topic: "Governance"
    },
    {
      id: "12346",
      title: "Increase Neuron Dissolve Delay Bonus to 8 Years",
      proposer: "xyz789uvw456rst123",
      deadline: "Dec 20, 2025",
      status: "Active",
      votesFor: 98000,
      votesAgainst: 62000,
      isVerified: true,
      topic: "Economics"
    },
    {
      id: "12344",
      title: "Add New SNS to Governance Whitelist",
      proposer: "mno345pqr678stu901",
      deadline: "Nov 30, 2025",
      status: "Executed",
      votesFor: 215000,
      votesAgainst: 18000,
      isVerified: true,
      topic: "SNS & Neurons"
    },
    {
      id: "12343",
      title: "Modify Voting Reward Parameters",
      proposer: "def234ghi567jkl890",
      deadline: "Nov 28, 2025",
      status: "Rejected",
      votesFor: 45000,
      votesAgainst: 180000,
      isVerified: true,
      topic: "Economics"
    },
    {
      id: "12347",
      title: "Update Internet Identity Canister Security Protocol",
      proposer: "jkl012mno345pqr678",
      deadline: "Dec 25, 2025",
      status: "Active",
      votesFor: 156000,
      votesAgainst: 34000,
      isVerified: true,
      topic: "Network"
    },
    {
      id: "12348",
      title: "Introduce Liquid Democracy Features",
      proposer: "vwx890yzb123cde456",
      deadline: "Jan 5, 2026",
      status: "Active",
      votesFor: 87000,
      votesAgainst: 95000,
      isVerified: false,
      topic: "Governance"
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
            <Button
              variant="outline"
              onClick={() => setIsHelpModalOpen(true)}
              className="gap-2"
              data-testid="button-help"
            >
              <HelpCircle className="h-4 w-4" />
              First Time Voting?
            </Button>
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
