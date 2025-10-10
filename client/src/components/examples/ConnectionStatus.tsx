import ConnectionStatus from '../ConnectionStatus';

export default function ConnectionStatusExample() {
  return (
    <div className="p-4 space-y-4">
      <ConnectionStatus isConnected={false} />
      <ConnectionStatus isConnected={true} neuronId="1234567890abcdef" />
    </div>
  );
}
