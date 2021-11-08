import { useAppDispatch, useAppSelector } from "app/hooks";
import { OVERLAY_DELAY } from "common/constants";
import { useEffect, useState } from "react";
import {
  Button,
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
import { selectDiary } from "./diary-slice";
import { resourceThunk } from "./diary-thunk";

export interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState(resource.description);
  const [isDiary, setIsDiary] = useState(resource.isDiary);

  const diary = useAppSelector(selectDiary);
  const hasOtherDiary = diary !== null && !isDiary;

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
    dispatch(resourceThunk.update({ id: resource.id, isLost: true }));

  const toggleIsDiary = () => {
    const value = !isDiary;
    dispatch(resourceThunk.update({ id: resource.id, isDiary: value }));
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <OverlayTrigger
          placement="bottom"
          delay={OVERLAY_DELAY}
          overlay={
            <Tooltip>
              {hasOtherDiary
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
              disabled={hasOtherDiary}
              checked={isDiary}
              onClick={toggleIsDiary}
            >
              Diary
            </ToggleButton>
          </span>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          delay={OVERLAY_DELAY}
          overlay={<Tooltip>Remove this Resource</Tooltip>}
        >
          <Button
            variant="outline-danger"
            className="ms-3"
            onClick={handleLost}
          >
            Lost
          </Button>
        </OverlayTrigger>

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
      </Card.Body>
    </Card>
  );
}
