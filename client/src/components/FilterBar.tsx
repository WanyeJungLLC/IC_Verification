import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterBarProps {
  onStatusChange?: (status: string) => void;
  onSearchChange?: (search: string) => void;
  onSortChange?: (sort: string) => void;
}

export default function FilterBar({ onStatusChange, onSearchChange, onSortChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by proposal ID..."
          className="pl-9"
          onChange={(e) => onSearchChange?.(e.target.value)}
          data-testid="input-search"
        />
      </div>

      <Select onValueChange={onStatusChange} defaultValue="all">
        <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-status">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Proposals</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="executed">Executed</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onSortChange} defaultValue="newest">
        <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-sort">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="votes">Most Votes</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
