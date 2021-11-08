import { useAppDispatch } from "app/hooks";
import { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  FormGroup,
  ToggleButton,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";
import TextareaAutosize from "react-textarea-autosize";
import { Character } from "./diary-model";
import { characterThunk } from "./diary-thunk";

export interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const dispatch = useAppDispatch();

  const [isImmortal, setIsImmortal] = useState(character.isImmortal);
  const [description, setDescription] = useState(character.description);

  useEffect(() => {
    setIsImmortal(character.isImmortal);
  }, [character]);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    dispatch(characterThunk.update({ id: character.id, description: value }));
  };

  const handleDead = () =>
    dispatch(characterThunk.update({ id: character.id, isDead: true }));

  const toggleIsImmortal = () => {
    const value = !isImmortal;
    dispatch(characterThunk.update({ id: character.id, isImmortal: value }));
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              Mortal Characters die, but immortal Characters do not
            </Tooltip>
          }
        >
          <ToggleButton
            type="checkbox"
            size="sm"
            variant="outline-secondary"
            value="1"
            checked={isImmortal}
            onClick={toggleIsImmortal}
          >
            Immortal
          </ToggleButton>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip>
              {isImmortal
                ? "Immortal Characters cannot be removed"
                : "Remove this Character"}
            </Tooltip>
          }
        >
          <span className="d-inline-block">
            <Button
              size="sm"
              variant="outline-danger"
              value="2"
              className="ms-3"
              disabled={isImmortal}
              onClick={handleDead}
            >
              Dead
            </Button>
          </span>
        </OverlayTrigger>
        <FormGroup className="mt-3">
          <FormControl
            size="sm"
            as={DebounceInput}
            forceNotifyByEnter={false}
            debounceTimeout={1000}
            placeholder="Describe the character..."
            value={description}
            onChange={handleDescriptionChange}
            element={TextareaAutosize as any}
          />
        </FormGroup>
      </Card.Body>
    </Card>
  );
}
