import { useAppDispatch, useAppSelector } from "app/hooks";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";

import { experienceThunk, memoryThunk } from "./diary-thunk";
import { ExperienceList } from "./ExperienceList";
import { Experience, Memory } from "./diary-model";
import { selectDiary, selectIsDiaryFull } from "./diary-slice";
import { MEMORY_EXPERIENCE_CAPACITY } from "./diary-constants";

export interface MemoryCardProps {
  memory: Memory;
  experiences: Experience[];
}

export function MemoryCard({ memory, experiences }: MemoryCardProps) {
  const dispatch = useAppDispatch();
  const diary = useAppSelector(selectDiary);
  const isDiaryFull = useAppSelector(selectIsDiaryFull);

  const hasMaxExperiences = experiences.length >= MEMORY_EXPERIENCE_CAPACITY;

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
          overlay={
            <Tooltip>
              {hasMaxExperiences
                ? "A Memory can only hold three Experiences"
                : "Add a new Experience"}
            </Tooltip>
          }
        >
          <span className="d-inline-block">
            <Button
              disabled={hasMaxExperiences}
              size="sm"
              variant="outline-success"
              onClick={handleCreate}
            >
              Create
            </Button>
          </span>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Remove this Memory</Tooltip>}
        >
          <Button
            size="sm"
            className="ms-3"
            variant="outline-danger"
            onClick={handleForget}
          >
            Forget
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              {diary === null
                ? "Your Vampire does not have a Diary"
                : isDiaryFull
                ? "A Diary can only hold four Memories"
                : "Move this Memory to your Diary"}
            </Tooltip>
          }
        >
          <span className="d-inline-block">
            <Button
              disabled={diary === null || isDiaryFull}
              variant="outline-secondary"
              size="sm"
              className="ms-3"
              onClick={handleDiary}
            >
              Diary
            </Button>
          </span>
        </OverlayTrigger>

        <ExperienceList experiences={experiences} />
      </Card.Body>
    </Card>
  );
}
