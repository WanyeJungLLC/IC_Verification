import { useState } from 'react';
import VoteModal from '../VoteModal';
import { Button } from '@/components/ui/button';

export default function VoteModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>Open Vote Modal</Button>
      <VoteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        proposalId="12345"
        proposalTitle="Upgrade NNS Governance Canister to Version 2.0"
      />
    </div>
  );
}
