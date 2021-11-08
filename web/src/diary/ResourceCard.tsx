import { useAppDispatch } from "app/hooks";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import { Resource } from "./diary-model";
import { resourceThunk } from "./diary-thunk";

export interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState(resource.description);
  const [isDiary, setIsDiary] = useState(resource.isDiary);

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
    <Row className="mt-3">
      <Col xs="auto">
        <ToggleButton
          type="checkbox"
          size="sm"
          variant="outline-secondary"
          value="1"
          checked={isDiary}
          onClick={toggleIsDiary}
        >
          Diary
        </ToggleButton>
      </Col>
      <Col>
        <FormGroup>
          <FormControl
            size="sm"
            as={DebounceInput}
            forceNotifyByEnter={false}
            debounceTimeout={1000}
            placeholder="Describe the resource..."
            value={description}
            onChange={handleDescriptionChange}
          />
        </FormGroup>
      </Col>
      <Col xs="auto">
        <Button size="sm" variant="outline-danger" onClick={handleLost}>
          Lost
        </Button>
      </Col>
    </Row>
  );
}
