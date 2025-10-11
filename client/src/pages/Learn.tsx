import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, BookOpen, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import ProposalTypeGuide from "@/components/ProposalTypeGuide";
import HashVerificationTool from "@/components/HashVerificationTool";
import InteractiveTutorial from "@/components/InteractiveTutorial";
import EducationalResources from "@/components/EducationalResources";
import VerificationScriptDisplay from "@/components/VerificationScriptDisplay";
import learningHeroImg from "@assets/Image 2_1760197927312.jpeg";

export default function Learn() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${learningHeroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-chart-2" />
              <span className="text-sm font-medium text-chart-2">Learn & Verify</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Learning Center
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              Master proposal verification and governance participation with interactive tutorials and comprehensive guides.
            </p>
            <Button
              variant="outline"
              onClick={() => setLocation("/")}
              className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              data-testid="button-back-home"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Proposals
            </Button>
          </div>
        </div>
      </section>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">

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
