import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShieldCheck, Vote, FileSearch, Users, Network, Zap } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import votingProcessImg from "@assets/Image 5_1760197993845.jpeg";

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="gap-2"
              data-testid="button-back-home"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Proposals
            </Button>
          </div>

          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Decentralized Governance</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold" data-testid="text-about-title">
              About IC Governance
            </h1>
            <p className="text-lg text-muted-foreground">
              Understanding the Network Nervous System and how you can participate in shaping the Internet Computer
            </p>
          </div>

          {/* What is NNS Section */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">What is the Network Nervous System (NNS)?</h2>
            <p className="text-muted-foreground mb-6">
              The Network Nervous System (NNS) is the open, decentralized governance system of the Internet Computer. 
              It controls all aspects of the network, including protocol upgrades, node management, and economic parameters. 
              Anyone can participate by staking ICP tokens in neurons and voting on proposals.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-4 bg-muted/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Vote className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="font-semibold">Democratic</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Every neuron holder has a voice in shaping the network's future
                </p>
              </Card>
              
              <Card className="p-4 bg-muted/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <ShieldCheck className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="font-semibold">Transparent</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  All proposals and votes are recorded on-chain and publicly verifiable
                </p>
              </Card>
              
              <Card className="p-4 bg-muted/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Network className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="font-semibold">Decentralized</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  No single entity controls the network; power is distributed among participants
                </p>
              </Card>
            </div>
          </Card>

          {/* Voting Process Section with Image */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">How the Voting Process Works</h2>
            
            <div className="rounded-lg overflow-hidden border bg-muted/30 mb-6">
              <img 
                src={votingProcessImg} 
                alt="IC Governance Voting Process Diagram"
                className="w-full h-auto"
                data-testid="img-voting-process"
              />
              <div className="p-4 bg-muted/50 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Visual Guide:</strong> Complete workflow of the IC governance voting process from proposal submission to execution
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Proposal Submission</h3>
                  <p className="text-sm text-muted-foreground">
                    Any neuron holder can submit a proposal to the NNS. Proposals include upgrades, parameter changes, and network decisions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Verification Period</h3>
                  <p className="text-sm text-muted-foreground">
                    Community members verify proposal content by comparing hashes and reviewing code changes to ensure integrity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Voting Phase</h3>
                  <p className="text-sm text-muted-foreground">
                    Neuron holders vote Adopt, Reject, or Abstain. Voting power is proportional to staked ICP and dissolve delay.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Execution</h3>
                  <p className="text-sm text-muted-foreground">
                    If approved, the proposal is automatically executed on-chain. The network upgrades or changes happen trustlessly.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Key Features */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Why Verification Matters</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-chart-2/10">
                    <FileSearch className="h-5 w-5 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Trustless Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Don't trust, verify! Every proposal can be independently verified by comparing WASM hashes and Git commits.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-chart-3/10">
                    <Zap className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Reproducible Builds</h3>
                    <p className="text-sm text-muted-foreground">
                      All canister upgrades must have reproducible builds, ensuring the deployed code matches the public source.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <ShieldCheck className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Security Assurance</h3>
                    <p className="text-sm text-muted-foreground">
                      Verification prevents malicious code deployment and ensures only reviewed changes are implemented.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Users className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Community Oversight</h3>
                    <p className="text-sm text-muted-foreground">
                      The community actively participates in verification, creating a robust system of checks and balances.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Getting Started */}
          <Card className="p-8 bg-primary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Ready to Participate?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of participants in governing the Internet Computer. Start by connecting your Internet Identity and exploring active proposals.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button 
                size="lg"
                onClick={() => setLocation("/")}
                data-testid="button-view-proposals"
              >
                View Proposals
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => setLocation("/learn")}
                data-testid="button-learn-more"
              >
                Learn How to Verify
              </Button>
            </div>
          </Card>

          {/* Additional Resources */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Additional Resources</h3>
            <div className="space-y-2">
              <a 
                href="https://internetcomputer.org/nns" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                → Official NNS Documentation
              </a>
              <a 
                href="https://wiki.internetcomputer.org/wiki/Governance_of_the_Internet_Computer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                → IC Wiki: Governance Overview
              </a>
              <a 
                href="https://forum.dfinity.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                → DFINITY Developer Forum
              </a>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
