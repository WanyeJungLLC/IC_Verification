import VerificationPanel from '../VerificationPanel';

export default function VerificationPanelExample() {
  return (
    <div className="p-4 max-w-2xl">
      <VerificationPanel
        proposalId="12345"
        contentHash="0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890"
        onChainHash="0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890"
        isVerified={true}
      />
    </div>
  );
}
