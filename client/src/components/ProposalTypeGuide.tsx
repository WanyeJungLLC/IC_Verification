import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, Shield, Network, Users } from "lucide-react";
import proposalDiagramImg from "@assets/Image 2_1760197927312.jpeg";

const proposalTypes = [
  {
    id: "canister",
    name: "Canister Upgrade",
    icon: Code,
    color: "text-blue-500",
    description: "Upgrade core system canisters like Internet Identity and Governance",
    whatVerified: "Wasm binary matches source code at a specific Git commit",
    whyMatters: "Prevents malicious code deployment and ensures reproducibility",
    example: {
      id: "138130",
      title: "Internet Identity Upgrade",
      link: "https://nns.ic0.app/proposal/?u=qoctq-giaaa-aaaaa-aaaea-cai&proposal=138130"
    },
    risks: [
      "Malicious code injection",
      "Binary doesn't match source",
      "Bugs introduced without review"
    ]
  },
  {
    id: "icos",
    name: "IC OS Election",
    icon: Shield,
    color: "text-purple-500",
    description: "Elect and deploy new versions of the IC operating system",
    whatVerified: "Disk image reproducibility from claimed source",
    whyMatters: "Ensures node software integrity and prevents compromised upgrades",
    example: {
      id: "137938",
      title: "IC OS Upgrade",
      link: "https://nns.ic0.app/proposal/?u=qoctq-giaaa-aaaaa-aaaea-cai&proposal=137938"
    },
    risks: [
      "Nodes run unstable software",
      "Non-reproducible builds",
      "Silent backdoors or bugs"
    ]
  },
  {
    id: "nodeprovider",
    name: "Node Provider",
    icon: Network,
    color: "text-green-500",
    description: "Add or remove node providers and data centers",
    whatVerified: "Identity document hashes match proposal declarations",
    whyMatters: "Confirms authenticity and prevents fraudulent onboarding",
    example: {
      id: "137937",
      title: "Node Provider Onboarding",
      link: "https://nns.ic0.app/proposal/?u=qoctq-giaaa-aaaaa-aaaea-cai&proposal=137937"
    },
    risks: [
      "Fake identities gain access",
      "Unqualified providers compromise reliability",
      "Trust erosion from fraud"
    ]
  },
  {
    id: "participant",
    name: "Participant Management",
    icon: Users,
    color: "text-orange-500",
    description: "Update node configurations, subnet assignments, or admin roles",
    whatVerified: "Registry configuration parameters are valid",
    whyMatters: "Protects subnet stability and prevents misconfigurations",
    example: {
      id: "137936",
      title: "Subnet Configuration Update",
      link: "https://nns.ic0.app/proposal/?u=qoctq-giaaa-aaaaa-aaaea-cai&proposal=137936"
    },
    risks: [
      "Misconfigured subnets destabilize network",
      "Incorrect role assignments",
      "Registry inconsistencies cause outages"
    ]
  }
];

export default function ProposalTypeGuide() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Proposal Types & Verification</h2>
          <p className="text-muted-foreground mt-1">
            Learn what each proposal type does and how to verify it
          </p>
        </div>

        {/* Visual Diagram */}
        <div className="rounded-lg overflow-hidden border bg-muted/30">
          <img 
            src={proposalDiagramImg} 
            alt="IC Governance Proposal Types Diagram"
            className="w-full h-auto"
            data-testid="img-proposal-diagram"
          />
          <div className="p-4 bg-muted/50 border-t">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Visual Overview:</strong> Understanding IC governance proposal types and their verification processes
            </p>
          </div>
        </div>

        <Tabs defaultValue="canister" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {proposalTypes.map((type) => {
              const Icon = type.icon;
              return (
                <TabsTrigger key={type.id} value={type.id} className="gap-2">
                  <Icon className={`h-4 w-4 ${type.color}`} />
                  <span className="hidden sm:inline">{type.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {proposalTypes.map((type) => {
            const Icon = type.icon;
            return (
              <TabsContent key={type.id} value={type.id} className="space-y-6 mt-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-muted ${type.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{type.name}</h3>
                    <p className="text-muted-foreground mt-1">{type.description}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="p-4 bg-muted/50">
                    <h4 className="font-semibold mb-2">What's Verified</h4>
                    <p className="text-sm text-muted-foreground">{type.whatVerified}</p>
                  </Card>
                  <Card className="p-4 bg-muted/50">
                    <h4 className="font-semibold mb-2">Why It Matters</h4>
                    <p className="text-sm text-muted-foreground">{type.whyMatters}</p>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Risks Without Verification</h4>
                  <ul className="space-y-2">
                    {type.risks.map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-destructive mt-1">•</span>
                        <span className="text-muted-foreground">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Example Proposal</h4>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono">#{type.example.id}</Badge>
                      <span className="text-sm">{type.example.title}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(type.example.link, '_blank')}
                      className="gap-2"
                      data-testid={`button-view-example-${type.id}`}
                    >
                      View Example
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </Card>
  );
}
