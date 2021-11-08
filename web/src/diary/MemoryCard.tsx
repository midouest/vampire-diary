import { useAppDispatch, useAppSelector } from "app/hooks";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";

import { experienceThunk, memoryThunk } from "./diary-thunk";
import { ExperienceList } from "./ExperienceList";
import { Experience, Memory } from "./diary-model";
import { selectDiary } from "./diary-slice";

export interface MemoryCardProps {
  index: number;
  memory: Memory;
  experiences: Experience[];
}

export function MemoryCard({ index, memory, experiences }: MemoryCardProps) {
  const dispatch = useAppDispatch();
  const diary = useAppSelector(selectDiary);

  const createExperience = (memory: Memory) =>
    dispatch(experienceThunk.create({ memory: memory.id, description: "" }));

  const handleForget = () =>
    dispatch(memoryThunk.update({ id: memory.id, isForgotten: true }));

  const handleAddToDiary = () =>
    dispatch(memoryThunk.update({ id: memory.id, diary: diary!.id }));

  return (
    <Card>
      <Card.Header>Memory {index + 1}</Card.Header>
      <Card.Body>
        <Button onClick={() => createExperience(memory)}>
          Create Experience
        </Button>
        <Button variant="danger" onClick={handleForget}>
          Forget Memory
        </Button>
        {diary ? (
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>{diary.description}</Tooltip>}
          >
            <Button variant="secondary" onClick={handleAddToDiary}>
              Add to Diary
            </Button>
          </OverlayTrigger>
        ) : null}
        <ExperienceList experiences={experiences} />
      </Card.Body>
    </Card>
  );
}
