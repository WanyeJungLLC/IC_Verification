import { useState } from 'react';
import HelpModal from '../HelpModal';
import { Button } from '@/components/ui/button';

export default function HelpModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)}>Open Help Guide</Button>
      <HelpModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
