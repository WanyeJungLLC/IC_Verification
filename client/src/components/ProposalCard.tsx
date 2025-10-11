import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle, AlertCircle, Code, Shield, Network, Users } from "lucide-react";
import proposalTypeImg from "@assets/Image 6_1760197968668.jpeg";

export type ProposalStatus = "Active" | "Executed" | "Rejected" | "Pending";
export type ProposalType = "Canister Upgrade" | "IC OS Election" | "Node Provider" | "Participant Management";

export interface Proposal {
  id: string;
  title: string;
  proposer: string;
  deadline: string;
  status: ProposalStatus;
  votesFor: number;
  votesAgainst: number;
  isVerified: boolean;
  topic: string;
  type: ProposalType;
}

interface ProposalCardProps {
  proposal: Proposal;
  onVote?: (proposalId: string) => void;
  onViewDetails?: (proposalId: string) => void;
}

const statusConfig = {
  Active: { icon: Clock, color: "bg-chart-3 hover:bg-chart-3" },
  Executed: { icon: CheckCircle2, color: "bg-chart-2 hover:bg-chart-2" },
  Rejected: { icon: XCircle, color: "bg-destructive hover:bg-destructive" },
  Pending: { icon: AlertCircle, color: "bg-muted hover:bg-muted" },
};

const proposalTypeConfig = {
  "Canister Upgrade": { 
    icon: Code, 
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "text-blue-500"
  },
  "IC OS Election": { 
    icon: Shield, 
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "text-purple-500"
  },
  "Node Provider": { 
    icon: Network, 
    color: "from-green-500/20 to-green-600/10",
    iconColor: "text-green-500"
  },
  "Participant Management": { 
    icon: Users, 
    color: "from-orange-500/20 to-orange-600/10",
    iconColor: "text-orange-500"
  },
};

export default function ProposalCard({ proposal, onVote, onViewDetails }: ProposalCardProps) {
  const StatusIcon = statusConfig[proposal.status].icon;
  const TypeIcon = proposalTypeConfig[proposal.type].icon;
  const typeConfig = proposalTypeConfig[proposal.type];

  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-200" data-testid={`card-proposal-${proposal.id}`}>
      {/* Visual Header with Type Indicator */}
      <div className="relative h-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${proposalTypeImg})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${typeConfig.color}`} />
        <div className="relative h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg bg-background/90 backdrop-blur-sm ${typeConfig.iconColor}`}>
              <TypeIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Proposal Type</p>
              <p className={`text-sm font-semibold ${typeConfig.iconColor}`}>{proposal.type}</p>
            </div>
          </div>
          {proposal.isVerified && (
            <CheckCircle2 className="h-5 w-5 text-chart-2 shrink-0" data-testid={`icon-verified-${proposal.id}`} />
          )}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="font-mono text-xs shrink-0" data-testid={`badge-proposal-id-${proposal.id}`}>
                #{proposal.id}
              </Badge>
              <Badge 
                className={`gap-1.5 shrink-0 ${statusConfig[proposal.status].color}`}
                data-testid={`badge-status-${proposal.id}`}
              >
                <StatusIcon className="h-3 w-3" />
                {proposal.status}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg leading-tight line-clamp-2" data-testid={`text-title-${proposal.id}`}>
              {proposal.title}
            </h3>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Proposer</span>
            <span className="font-mono text-xs truncate max-w-[60%]" data-testid={`text-proposer-${proposal.id}`}>
              {proposal.proposer}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Deadline</span>
            <span className="font-medium" data-testid={`text-deadline-${proposal.id}`}>{proposal.deadline}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Topic</span>
            <Badge variant="secondary" className="text-xs" data-testid={`badge-topic-${proposal.id}`}>{proposal.topic}</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Votes For</span>
            <span className="font-semibold text-chart-2" data-testid={`text-votes-for-${proposal.id}`}>
              {proposal.votesFor.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Votes Against</span>
            <span className="font-semibold text-destructive" data-testid={`text-votes-against-${proposal.id}`}>
              {proposal.votesAgainst.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewDetails?.(proposal.id)}
            data-testid={`button-details-${proposal.id}`}
          >
            View Details
          </Button>
          {proposal.status === "Active" && (
            <Button 
              className="flex-1"
              onClick={() => onVote?.(proposal.id)}
              data-testid={`button-vote-${proposal.id}`}
            >
              Vote Now
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
