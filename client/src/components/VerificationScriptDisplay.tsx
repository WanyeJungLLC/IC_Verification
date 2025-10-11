import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const scripts = {
  canister: {
    title: "Canister Upgrade Verification",
    description: "Verify Wasm binary matches source code",
    steps: [
      {
        label: "Clone and checkout",
        command: `git clone https://github.com/dfinity/ic.git
cd ic
git checkout <commit-hash>`
      },
      {
        label: "Build canister",
        command: `# Follow repo build instructions
./gitlab-ci/container/build-ic.sh -c`
      },
      {
        label: "Calculate hash",
        command: `shasum -a 256 path/to/built_canister.wasm`
      },
      {
        label: "Verify hash",
        command: `./scripts/verify-hash --ii-hash <proposal-hash> --archive-hash <built-hash>`
      }
    ]
  },
  icos: {
    title: "IC OS Election Verification",
    description: "Verify reproducible image build",
    steps: [
      {
        label: "Download script",
        command: `curl --proto '=https' --tlsv1.2 -sSLO \\
  https://raw.githubusercontent.com/dfinity/ic/<commit>/gitlab-ci/tools/repro-check.sh`
      },
      {
        label: "Make executable",
        command: `chmod +x repro-check.sh`
      },
      {
        label: "Run verification",
        command: `./repro-check.sh -c <commit-hash>`
      }
    ]
  },
  nodeprovider: {
    title: "Node Provider Verification",
    description: "Verify identity document hashes",
    steps: [
      {
        label: "Download document",
        command: `curl -LO <document-url>`
      },
      {
        label: "Calculate hash",
        command: `shasum -a 256 node_provider_identity.pdf`
      },
      {
        label: "Compare",
        command: `# Compare output with proposal hash
# They should match exactly`
      }
    ]
  },
  participant: {
    title: "Participant Management Verification",
    description: "Verify registry parameters",
    steps: [
      {
        label: "Review parameters",
        command: `# Check proposal for:
# - Node ID
# - Subnet assignment
# - Registry version`
      },
      {
        label: "Validate config",
        command: `# Ensure parameters match
# expected registry state
# Check for consistency`
      }
    ]
  }
};

export default function VerificationScriptDisplay() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Command copied to clipboard",
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Terminal className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Verification Scripts</h2>
            <p className="text-muted-foreground">
              Copy and run these commands to verify proposals
            </p>
          </div>
        </div>

        <Tabs defaultValue="canister" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="canister">Canister</TabsTrigger>
            <TabsTrigger value="icos">IC OS</TabsTrigger>
            <TabsTrigger value="nodeprovider">Node Provider</TabsTrigger>
            <TabsTrigger value="participant">Participant</TabsTrigger>
          </TabsList>

          {Object.entries(scripts).map(([key, script]) => (
            <TabsContent key={key} value={key} className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold text-lg">{script.title}</h3>
                <p className="text-sm text-muted-foreground">{script.description}</p>
              </div>

              <div className="space-y-3">
                {script.steps.map((step, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Step {idx + 1}: {step.label}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(step.command)}
                        className="gap-2 h-8"
                        data-testid={`button-copy-${key}-${idx}`}
                      >
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md border font-mono text-xs overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-all">{step.command}</pre>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-chart-3/10 border border-chart-3/20 p-3 rounded-md">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Replace placeholders like &lt;commit-hash&gt; and &lt;proposal-hash&gt; with actual values from the proposal.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Card>
  );
}
