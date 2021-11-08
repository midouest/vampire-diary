import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useEffect, useState } from "react";
import { Card, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { Event } from "./diary-model";
import {
  eventBack,
  eventEnd,
  eventForward,
  eventStart,
  selectIsDead,
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

  return (
    <Card>
      <Card.Body>
        <Card.Title>Prompt {currentIndex + 1}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {currentEvent?.prompt}
        </Card.Subtitle>

        <Form>
          <FormGroup>
            <FormLabel>Entry</FormLabel>
            <FormControl
              as={DebounceInput}
              debounceTimeout={1000}
              placeholder="Describe what happens..."
              value={description}
              onChange={handleDescriptionChange}
              element="textarea"
            />
          </FormGroup>
        </Form>

        {isFirstEvent ? null : (
          <Card.Link href="#" onClick={handleFirst}>
            First
          </Card.Link>
        )}

        {previousEvent ? (
          <Card.Link href="#" onClick={handlePrev}>
            Previous
          </Card.Link>
        ) : null}

        {isGameOver ? null : (
          <Card.Link href="#" onClick={handleNext}>
            Next
          </Card.Link>
        )}

        {isLastEvent ? null : (
          <Card.Link href="#" onClick={handleLast}>
            Last
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}
