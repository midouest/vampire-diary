import { Experience, Memory } from "./diary-model";
import { MemoryCard } from "./MemoryCard";

export interface MemoryListProps {
  memories: Memory[];
  experiences: Experience[];
}

export function MemoryList({ memories, experiences }: MemoryListProps) {
  const experienceMap = experiences.reduce((map, experience) => {
    const existing = map.get(experience.memory);
    if (existing) {
      existing.push(experience);
    } else {
      map.set(experience.memory, [experience]);
    }
    return map;
  }, new Map<number, Experience[]>());

  return (
    <>
      {memories.map((memory) => (
        <MemoryCard
          key={memory.id}
          memory={memory}
          experiences={experienceMap.get(memory.id) ?? []}
        />
      ))}
    </>
  );
}
