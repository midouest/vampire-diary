import { useAppDispatch } from "app/hooks";
import { Container, Row, Button } from "react-bootstrap";
import { Experience, Memory } from "./diary-model";
import { experienceThunk } from "./diary-thunk";
import { ExperienceList } from "./ExperienceList";

export interface MemoryListProps {
  memories: Memory[];
  experiences: Experience[];
}

export function MemoryList({ memories, experiences }: MemoryListProps) {
  const dispatch = useAppDispatch();

  const experienceMap = experiences.reduce((map, experience) => {
    const existing = map.get(experience.memory);
    if (existing) {
      existing.push(experience);
    } else {
      map.set(experience.memory, [experience]);
    }
    return map;
  }, new Map<number, Experience[]>());

  const createExperience = (memory: Memory) =>
    dispatch(experienceThunk.create({ memory: memory.id, description: "" }));

  return (
    <Container>
      {memories.map((memory) => (
        <Row key={memory.id}>
          <Button onClick={() => createExperience(memory)}>
            Create Experience
          </Button>
          <ExperienceList experiences={experienceMap.get(memory.id) ?? []} />
        </Row>
      ))}
    </Container>
  );
}
