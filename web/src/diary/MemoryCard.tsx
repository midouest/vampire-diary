import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  Button,
  Card,
  OverlayTrigger,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";

import { experienceThunk, memoryThunk } from "./diary-thunk";
import { ExperienceList } from "./ExperienceList";
import { Experience, Memory } from "./diary-model";
import { selectCurrentDiary, selectCurrentDiaryIsFull } from "./diary-slice";
import { MEMORY_EXPERIENCE_CAPACITY } from "./diary-constants";
import { OVERLAY_DELAY } from "common/constants";

export interface MemoryCardProps {
  memory: Memory;
  experiences: Experience[];
}

export function MemoryCard({ memory, experiences }: MemoryCardProps) {
  const dispatch = useAppDispatch();
  const diary = useAppSelector(selectCurrentDiary);
  const isDiaryFull = useAppSelector(selectCurrentDiaryIsFull);

  const hasMaxExperiences = experiences.length >= MEMORY_EXPERIENCE_CAPACITY;

  const handleCreate = () =>
    dispatch(experienceThunk.create({ memory: memory.id, description: "" }));

  const handleForget = () =>
    dispatch(
      memoryThunk.update({ id: memory.id, isForgotten: !memory.isForgotten })
    );

  const handleDiary = () =>
    dispatch(memoryThunk.update({ id: memory.id, diary: diary!.id }));

  return (
    <Card className="mt-3">
      <Card.Header>Experiences</Card.Header>
      <Card.Body>
        {memory.diary === null ? (
          <>
            <OverlayTrigger
              placement="bottom"
              delay={OVERLAY_DELAY}
              overlay={
                <Tooltip>
                  {memory.isForgotten
                    ? "Cannot add new Experiences to a forgotten Memory"
                    : hasMaxExperiences
                    ? "A Memory can only hold three Experiences"
                    : "Add a new Experience"}
                </Tooltip>
              }
            >
              <span className="d-inline-block">
                <Button
                  disabled={hasMaxExperiences || memory.isForgotten}
                  variant="outline-success"
                  onClick={handleCreate}
                >
                  <i className="bi bi-plus-lg me-2"></i>
                  Create
                </Button>
              </span>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={OVERLAY_DELAY}
              overlay={<Tooltip>Remove this Memory</Tooltip>}
            >
              <ToggleButton
                type="checkbox"
                value="1"
                className="ms-3"
                variant="outline-danger"
                checked={memory.isForgotten}
                onClick={handleForget}
              >
                <i className="bi bi-x-lg me-2"></i>
                Forget
              </ToggleButton>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={OVERLAY_DELAY}
              overlay={
                <Tooltip>
                  {diary === null
                    ? "Your Vampire does not have a Diary"
                    : isDiaryFull
                    ? "A Diary can only hold four Memories"
                    : memory.isForgotten
                    ? "A forgotten Memory cannot be stored in a Diary"
                    : "Move this Memory to your Diary"}
                </Tooltip>
              }
            >
              <span className="d-inline-block">
                <Button
                  disabled={diary === null || isDiaryFull || memory.isForgotten}
                  variant="outline-secondary"
                  className="ms-3"
                  onClick={handleDiary}
                >
                  <i className="bi bi-book me-2"></i>
                  Record
                </Button>
              </span>
            </OverlayTrigger>
          </>
        ) : null}

        {memory.isForgotten || memory.diary !== null ? (
          <>
            {experiences.map((experience) => (
              <Card.Text key={experience.id} className="text-muted mt-3">
                {experience.description}
              </Card.Text>
            ))}
          </>
        ) : (
          <ExperienceList experiences={experiences} />
        )}
      </Card.Body>
    </Card>
  );
}
