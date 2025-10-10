import { CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ConnectionStatusProps {
  isConnected: boolean;
  neuronId?: string;
}

export default function ConnectionStatus({ isConnected, neuronId }: ConnectionStatusProps) {
  if (!isConnected) {
    return (
      <Badge variant="secondary" className="gap-1.5" data-testid="badge-disconnected">
        <XCircle className="h-3.5 w-3.5" />
        <span>Not Connected</span>
      </Badge>
    );
  }

  return (
    <Badge variant="default" className="gap-1.5 bg-chart-2 hover:bg-chart-2" data-testid="badge-connected">
      <CheckCircle2 className="h-3.5 w-3.5" />
      <span className="font-mono text-xs">
        {neuronId ? `Neuron ${neuronId.slice(0, 8)}...` : "Connected"}
      </span>
    </Badge>
  );
}
