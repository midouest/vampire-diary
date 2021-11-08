import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  Button,
  Card,
  FormControl,
  FormGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import TextareaAutosize from "react-textarea-autosize";
import { updateVampire } from "vampire/vampire-slice";
import { Event } from "./diary-model";
import {
  eventBack,
  eventEnd,
  eventForward,
  eventStart,
  selectIsDead,
  selectIsExhausted,
  selectIsFirstEvent,
  selectIsLastEvent,
  selectPreviousEvent,
} from "./diary-slice";
import { eventThunk } from "./diary-thunk";

export interface JournalCardProps {
  vampireId: number;
  currentIndex: number;
  currentEvent: Event;
}

export function JournalCard({
  vampireId,
  currentIndex,
  currentEvent,
}: JournalCardProps) {
  const dispatch = useAppDispatch();
  const isFirstEvent = useAppSelector(selectIsFirstEvent);
  const isLastEvent = useAppSelector(selectIsLastEvent);
  const isGameOver = useAppSelector(selectIsDead);
  const isExhausted = useAppSelector(selectIsExhausted);
  const previousEvent = useAppSelector(selectPreviousEvent);

  const [description, setDescription] = useState(currentEvent.description);

  useEffect(() => {
    setDescription(currentEvent.description);
  }, [currentEvent]);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    dispatch(eventThunk.update({ id: currentEvent.id, description: value }));
  };

  const handleFirst = () => dispatch(eventStart());

  const handleLast = () => dispatch(eventEnd());

  const handlePrev = () => dispatch(eventBack());

  const handleNext = () => {
    if (isLastEvent) {
      dispatch(eventThunk.create({ vampire: vampireId }));
    } else {
      dispatch(eventForward());
    }
  };

  const handleDead = () =>
    dispatch(updateVampire({ id: vampireId, isDead: true }));

  return (
    <Card>
      <Card.Header>Prompt {currentIndex + 1}</Card.Header>
      <Card.Body>
        <Card.Text>{currentEvent?.prompt}</Card.Text>
        <Card.Text>Create a new Experience.</Card.Text>

        <FormGroup>
          <FormControl
            size="sm"
            as={DebounceInput}
            forceNotifyByEnter={false}
            debounceTimeout={1000}
            placeholder="Describe what happens..."
            value={description}
            onChange={handleDescriptionChange}
            element={TextareaAutosize as any}
          />
        </FormGroup>

        <ButtonGroup size="sm" className="mt-3">
          <Button
            variant="outline-secondary"
            disabled={isFirstEvent}
            onClick={handleFirst}
          >
            First
          </Button>
          <Button
            variant="outline-secondary"
            disabled={isLastEvent}
            onClick={handleLast}
          >
            Last
          </Button>
        </ButtonGroup>

        <ButtonGroup size="sm" className="ms-3 mt-3">
          <Button
            variant="outline-secondary"
            disabled={!previousEvent}
            onClick={handlePrev}
          >
            Previous
          </Button>

          <Button
            variant={isLastEvent ? "outline-success" : "outline-secondary"}
            disabled={isGameOver}
            onClick={handleNext}
          >
            Next
          </Button>
        </ButtonGroup>

        {isExhausted && !isGameOver ? (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>
                <p>
                  You die if Prompt forces you to check a Skill or lose a
                  Resource but you have none.
                </p>
                <p>
                  Describe how your Vampire dies and then click this button to
                  end the game.
                </p>
              </Tooltip>
            }
          >
            <Button
              size="sm"
              variant="outline-danger"
              className="ms-3 mt-3"
              onClick={handleDead}
            >
              Dead
            </Button>
          </OverlayTrigger>
        ) : null}
      </Card.Body>
    </Card>
  );
}
