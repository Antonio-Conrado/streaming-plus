import { Star } from "lucide-react";

export default function Rating({ vote_average }: { vote_average: number }) {
  return (
    <div className="flex flex-row gap-1  items-center justify-end">
      {Math.floor(vote_average)}
      <span>
        <Star className="text-amber-300" />
      </span>
    </div>
  );
}
