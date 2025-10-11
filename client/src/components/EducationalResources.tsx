import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Video, MessageSquare, FileText } from "lucide-react";

const resources = {
  documentation: [
    {
      title: "Verify Proposals Official Guide",
      description: "Official documentation on how to verify IC proposals",
      url: "https://internetcomputer.org/docs/building-apps/governing-apps/nns/concepts/proposals/verify-proposals",
      icon: FileText
    },
    {
      title: "Proposals Overview",
      description: "Learn about different proposal types and structures",
      url: "https://learn.internetcomputer.org/hc/en-us/articles/34084113508500-Proposals",
      icon: BookOpen
    },
    {
      title: "Proposal Topics and Types",
      description: "Detailed breakdown of all proposal categories",
      url: "https://learn.internetcomputer.org/hc/en-us/articles/34140518658068-Proposal-Topics-and-Types",
      icon: BookOpen
    },
    {
      title: "Voting Rewards",
      description: "Understand how voting rewards work in the NNS",
      url: "https://learn.internetcomputer.org/hc/en-us/articles/34142993417108-Voting-Rewards",
      icon: FileText
    }
  ],
  videos: [
    {
      title: "IC Governance Explained",
      description: "Visual guide to Internet Computer governance",
      url: "https://www.youtube.com/watch?v=BsIg4JZobqU",
      icon: Video
    },
    {
      title: "How to Vote on Proposals",
      description: "Step-by-step video tutorial on voting",
      url: "https://www.youtube.com/watch?v=i_ANhb0E1Io",
      icon: Video
    },
    {
      title: "Proposal Verification Walkthrough",
      description: "Live demonstration of hash verification",
      url: "https://www.youtube.com/watch?v=z3rAQBkO8uI",
      icon: Video
    }
  ],
  examples: [
    {
      title: "Example Proposal #129394",
      description: "Real proposal for practicing verification",
      url: "https://dashboard.internetcomputer.org/proposal/129394",
      icon: MessageSquare
    },
    {
      title: "IC Forum Announcements",
      description: "Stay updated with IC OS updates and discussions",
      url: "https://forum.dfinity.org/t/announcements-of-ic-os-updates/50763",
      icon: MessageSquare
    }
  ]
};

export default function EducationalResources() {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Educational Resources</h2>
          <p className="text-muted-foreground mt-1">
            Learn from official documentation, video tutorials, and community examples
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Official Documentation
            </h3>
            <div className="grid gap-3">
              {resources.documentation.map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-4 p-3 rounded-md border bg-muted/50 hover-elevate"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm">{resource.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                      className="gap-2 shrink-0"
                      data-testid={`button-doc-${idx}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Video className="h-5 w-5" />
              Video Tutorials
            </h3>
            <div className="grid gap-3">
              {resources.videos.map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-4 p-3 rounded-md border bg-muted/50 hover-elevate"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm">{resource.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                      className="gap-2 shrink-0"
                      data-testid={`button-video-${idx}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Community & Examples
            </h3>
            <div className="grid gap-3">
              {resources.examples.map((resource, idx) => {
                const Icon = resource.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-4 p-3 rounded-md border bg-muted/50 hover-elevate"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm">{resource.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                      className="gap-2 shrink-0"
                      data-testid={`button-example-${idx}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
