import ProposalCard from '../ProposalCard';

export default function ProposalCardExample() {
  const mockProposal = {
    id: "12345",
    title: "Upgrade NNS Governance Canister to Version 2.0",
    proposer: "abc123def456ghi789",
    deadline: "Dec 15, 2025",
    status: "Active" as const,
    votesFor: 125000,
    votesAgainst: 45000,
    isVerified: true,
    topic: "Governance"
  };

  return (
    <div className="p-4 max-w-md">
      <ProposalCard 
        proposal={mockProposal}
        onVote={(id) => console.log('Vote on proposal:', id)}
        onViewDetails={(id) => console.log('View details:', id)}
      />
    </div>
  );
}
