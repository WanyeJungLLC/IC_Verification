import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import ProposalTypeGuide from "@/components/ProposalTypeGuide";
import HashVerificationTool from "@/components/HashVerificationTool";
import InteractiveTutorial from "@/components/InteractiveTutorial";
import EducationalResources from "@/components/EducationalResources";
import VerificationScriptDisplay from "@/components/VerificationScriptDisplay";

export default function Learn() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
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

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold" data-testid="text-learn-title">
                Learning Center
              </h1>
              <p className="text-muted-foreground mt-1">
                Master proposal verification and governance participation
              </p>
            </div>
          </div>

          <Tabs defaultValue="tutorial" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6">
              <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
              <TabsTrigger value="types">Proposal Types</TabsTrigger>
              <TabsTrigger value="verification">Hash Tool</TabsTrigger>
              <TabsTrigger value="scripts">Scripts</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="tutorial" className="space-y-6">
              <InteractiveTutorial />
            </TabsContent>

            <TabsContent value="types" className="space-y-6">
              <ProposalTypeGuide />
            </TabsContent>

            <TabsContent value="verification" className="space-y-6">
              <HashVerificationTool />
            </TabsContent>

            <TabsContent value="scripts" className="space-y-6">
              <VerificationScriptDisplay />
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <EducationalResources />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
