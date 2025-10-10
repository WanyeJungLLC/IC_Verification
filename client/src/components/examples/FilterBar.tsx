import FilterBar from '../FilterBar';

export default function FilterBarExample() {
  return (
    <div className="p-4">
      <FilterBar
        onStatusChange={(status) => console.log('Status:', status)}
        onSearchChange={(search) => console.log('Search:', search)}
        onSortChange={(sort) => console.log('Sort:', sort)}
      />
    </div>
  );
}
