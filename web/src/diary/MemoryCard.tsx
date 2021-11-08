import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  Button,
  ButtonGroup,
  Card,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import { experienceThunk, memoryThunk } from "./diary-thunk";
import { ExperienceList } from "./ExperienceList";
import { Experience, Memory } from "./diary-model";
import { selectDiary } from "./diary-slice";

export interface MemoryCardProps {
  memory: Memory;
  experiences: Experience[];
}

export function MemoryCard({ memory, experiences }: MemoryCardProps) {
  const dispatch = useAppDispatch();
  const diary = useAppSelector(selectDiary);

  const handleCreate = () =>
    dispatch(experienceThunk.create({ memory: memory.id, description: "" }));

  const handleForget = () =>
    dispatch(memoryThunk.update({ id: memory.id, isForgotten: true }));

  const handleDiary = () =>
    dispatch(memoryThunk.update({ id: memory.id, diary: diary!.id }));

  return (
    <Card className="mt-3">
      <Card.Header>Experiences</Card.Header>
      <Card.Body>
        <ButtonGroup size="sm">
          <Button variant="outline-success" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="outline-danger" onClick={handleForget}>
            Forget
          </Button>
          {diary ? (
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>{diary.description}</Tooltip>}
            >
              <Button variant="outline-secondary" onClick={handleDiary}>
                Diary
              </Button>
            </OverlayTrigger>
          ) : null}
        </ButtonGroup>
        <ExperienceList experiences={experiences} />
      </Card.Body>
    </Card>
  );
}
