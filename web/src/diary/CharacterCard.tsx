import { useAppDispatch } from "app/hooks";
import { OVERLAY_DELAY } from "common/constants";
import { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  FormGroup,
  ToggleButton,
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
    dispatch(
      characterThunk.update({ id: character.id, isDead: !character.isDead })
    );

  const toggleIsImmortal = () => {
    const value = !isImmortal;
    dispatch(characterThunk.update({ id: character.id, isImmortal: value }));
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <OverlayTrigger
          placement="bottom"
          delay={OVERLAY_DELAY}
          overlay={
            <Tooltip>
              {character.isDead
                ? "A dead Character cannot become immortal"
                : "Immortal Characters cannot be removed"}
            </Tooltip>
          }
        >
          <span className="d-inline-block">
            <ToggleButton
              type="checkbox"
              variant="outline-secondary"
              value="1"
              checked={isImmortal}
              onClick={toggleIsImmortal}
              disabled={character.isDead}
            >
              <i className="bi bi-lock me-2"></i>
              Immortal
            </ToggleButton>
          </span>
        </OverlayTrigger>

        <OverlayTrigger
          placement="bottom"
          delay={OVERLAY_DELAY}
          overlay={
            <Tooltip>
              {isImmortal
                ? "Immortal Characters cannot be removed"
                : "Remove this Character"}
            </Tooltip>
          }
        >
          <span className="d-inline-block">
            <ToggleButton
              type="checkbox"
              variant="outline-danger"
              value="2"
              className="ms-3"
              disabled={isImmortal}
              checked={character.isDead}
              onClick={handleDead}
            >
              <i className="bi bi-x-lg me-2"></i>
              Dead
            </ToggleButton>
          </span>
        </OverlayTrigger>

        {character.isDead ? (
          <Card.Text className="text-muted mt-3">
            {character.description}
          </Card.Text>
        ) : (
          <FormGroup className="mt-3">
            <FormControl
              as={DebounceInput}
              forceNotifyByEnter={false}
              debounceTimeout={1000}
              placeholder="Describe the character..."
              value={description}
              onChange={handleDescriptionChange}
              element={TextareaAutosize as any}
            />
          </FormGroup>
        )}
      </Card.Body>
    </Card>
  );
}
