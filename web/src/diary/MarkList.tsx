import { Mark } from "./diary-model";
import { MarkCard } from "./MarkCard";

export interface MarkListProps {
  marks: Mark[];
}

export function MarkList({ marks }: MarkListProps) {
  return (
    <>
      {marks.map((mark) => (
        <MarkCard key={mark.id} mark={mark} />
      ))}
    </>
  );
}
