import { useState } from "react";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedMasthead from "@/components/ThemedMasthead";
import ThemedFooter from "@/components/ThemedFooter";
import ZenHomeDesign3 from "@/components/zen/ZenHomeDesign3";
import OutreachMessageModal from "@/components/outreach/OutreachMessageModal";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ThemedLayout>
      <ThemedMasthead />

      {/* Demo button for outreach modal */}
      <div className="container ">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet hover:opacity-90 text-white border-0"
        >
          <MessageSquare className="w-4 h-4" />
          Generate Outreach Message
        </Button>
      </div>

      <ZenHomeDesign3 />
      <ThemedFooter />

      <OutreachMessageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle="Senior Frontend Engineer"
        companyName="AirOps"
      />
    </ThemedLayout>
  );
};

export default Index;
