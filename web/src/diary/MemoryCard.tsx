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
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Add a new Experience</Tooltip>}
        >
          <Button size="sm" variant="outline-success" onClick={handleCreate}>
            Create
          </Button>
        </OverlayTrigger>
        <ButtonGroup size="sm" className="ms-3">
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Remove this Memory</Tooltip>}
          >
            <Button variant="outline-danger" onClick={handleForget}>
              Forget
            </Button>
          </OverlayTrigger>

          {diary ? (
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip>Move this Memory to your Diary</Tooltip>}
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
