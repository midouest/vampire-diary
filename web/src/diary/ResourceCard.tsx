import { useAppDispatch, useAppSelector } from "app/hooks";
import { OVERLAY_DELAY } from "common/constants";
import { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  FormGroup,
  OverlayTrigger,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import TextareaAutosize from "react-textarea-autosize";
import { Resource } from "./diary-model";
import {
  experienceSelectors,
  selectCurrentDiary,
  selectCurrentDiaryMemories,
  selectShowDiaryMemories,
  toggleShowDiaryMemories,
} from "./diary-slice";
import { resourceThunk } from "./diary-thunk";
import { MemoryList } from "./MemoryList";

export interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState(resource.description);
  const [isDiary, setIsDiary] = useState(resource.isDiary);

  const diary = useAppSelector(selectCurrentDiary);
  const hasOtherDiary = diary !== null && !isDiary;

  const showMemories = useAppSelector(selectShowDiaryMemories);
  const memories = useAppSelector(selectCurrentDiaryMemories);
  const experiences = useAppSelector(experienceSelectors.selectAll);

  useEffect(() => {
    setIsDiary(resource.isDiary);
  }, [resource]);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    dispatch(resourceThunk.update({ id: resource.id, description: value }));
  };

  const handleLost = () =>
    dispatch(
      resourceThunk.update({ id: resource.id, isLost: !resource.isLost })
    );

  const toggleIsDiary = () => {
    const value = !isDiary;
    dispatch(resourceThunk.update({ id: resource.id, isDiary: value }));
  };

  const handleToggleShowMemories = () => {
    dispatch(toggleShowDiaryMemories());
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <OverlayTrigger
          placement="bottom"
          delay={OVERLAY_DELAY}
          overlay={
            <Tooltip>
              {resource.isLost
                ? "A lost Resource cannot become a Diary"
                : hasOtherDiary
                ? "A Vampire can only hold one Diary"
                : "A Diary can hold up to four Memories"}
            </Tooltip>
          }
        >
          <span className="d-inline-block">
            <ToggleButton
              type="checkbox"
              variant="outline-secondary"
              value="1"
              disabled={hasOtherDiary || resource.isLost}
              checked={isDiary}
              onClick={toggleIsDiary}
            >
              <i className="bi bi-book"></i>
              <span className="ms-2 d-none d-lg-inline">Diary</span>
            </ToggleButton>
          </span>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          delay={OVERLAY_DELAY}
          overlay={<Tooltip>Remove this Resource</Tooltip>}
        >
          <ToggleButton
            type="checkbox"
            value="1"
            variant="outline-danger"
            className="ms-3"
            checked={resource.isLost}
            onClick={handleLost}
          >
            <i className="bi bi-x-lg"></i>
            <span className="ms-2 d-none d-lg-inline">Lost</span>
          </ToggleButton>
        </OverlayTrigger>

        {isDiary && !resource.isLost ? (
          <OverlayTrigger
            placement="bottom"
            delay={OVERLAY_DELAY}
            overlay={<Tooltip>Show Memories recorded in this Diary</Tooltip>}
          >
            <ToggleButton
              type="checkbox"
              value="2"
              variant="outline-primary"
              className="ms-3"
              checked={showMemories}
              onClick={handleToggleShowMemories}
            >
              <i className="bi bi-eye"></i>
              <span className="ms-2 d-none d-lg-inline">Show Memories</span>
            </ToggleButton>
          </OverlayTrigger>
        ) : null}

        {resource.isLost ? (
          <Card.Text className="text-muted mt-3">
            {resource.description}
          </Card.Text>
        ) : (
          <FormGroup>
            <FormControl
              className="mt-3"
              as={DebounceInput}
              element={TextareaAutosize as any}
              forceNotifyByEnter={false}
              debounceTimeout={1000}
              placeholder="Describe the resource..."
              value={description}
              onChange={handleDescriptionChange}
            />
          </FormGroup>
        )}

        {showMemories ? (
          <MemoryList memories={memories} experiences={experiences} />
        ) : null}
      </Card.Body>
    </Card>
  );
}
