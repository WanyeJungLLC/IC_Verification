import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { HelpCircle, Github, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import ProposalCard, { type Proposal } from "@/components/ProposalCard";
import FilterBar from "@/components/FilterBar";
import VoteModal from "@/components/VoteModal";
import HelpModal from "@/components/HelpModal";
import ProposalDetailsModal from "@/components/ProposalDetailsModal";
import heroBannerImg from "@assets/Image 1_1760197898264.jpeg";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  // Filter and sort state
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

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
    const proposal = mockProposals.find(p => p.id === proposalId);
    if (proposal) {
      setSelectedProposal(proposal);
      setIsDetailsModalOpen(true);
    }
  };

  // Filter and sort proposals
  const filteredAndSortedProposals = mockProposals
    .filter(proposal => {
      // Status filter
      if (statusFilter !== "all" && proposal.status.toLowerCase() !== statusFilter) {
        return false;
      }
      
      // Search filter
      if (searchQuery && !proposal.id.includes(searchQuery)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return parseInt(b.id) - parseInt(a.id);
        case "oldest":
          return parseInt(a.id) - parseInt(b.id);
        case "votes":
          return (b.votesFor + b.votesAgainst) - (a.votesFor + a.votesAgainst);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBannerImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-chart-2" />
              <span className="text-sm font-medium text-chart-2">Verified On-Chain Governance</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Internet Computer Governance Voting
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              Participate in the Network Nervous System by viewing, verifying, and voting on IC governance proposals with full transparency.
            </p>
            <div className="flex gap-3">
              <Button 
                size="lg"
                onClick={() => document.getElementById('proposals-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="gap-2"
                data-testid="button-view-proposals"
              >
                View Proposals
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setLocation("/learn")}
                className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-hero-learn"
              >
                <GraduationCap className="h-4 w-4" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8" id="proposals-section">
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
            onStatusChange={setStatusFilter}
            onSearchChange={setSearchQuery}
            onSortChange={setSortBy}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProposals.length > 0 ? (
              filteredAndSortedProposals.map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  onVote={handleVote}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground" data-testid="text-no-results">
                  No proposals found matching your filters
                </p>
              </div>
            )}
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
        <>
          <VoteModal
            isOpen={isVoteModalOpen}
            onClose={() => {
              setIsVoteModalOpen(false);
              setSelectedProposal(null);
            }}
            proposalId={selectedProposal.id}
            proposalTitle={selectedProposal.title}
          />
          
          <ProposalDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => {
              setIsDetailsModalOpen(false);
              setSelectedProposal(null);
            }}
            proposal={selectedProposal}
            onVote={() => {
              setIsDetailsModalOpen(false);
              setIsVoteModalOpen(true);
              // Don't clear selectedProposal - let VoteModal handle it
            }}
          />
        </>
      )}

      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  );
}
