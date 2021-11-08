import { useAppDispatch } from "app/hooks";
import { OVERLAY_DELAY } from "common/constants";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { eventThunk } from "./diary-thunk";

export interface CreationCardProps {
  vampireId: number;
}

export function CreationCard({ vampireId }: CreationCardProps) {
  const dispatch = useAppDispatch();

  const handleStart = () => dispatch(eventThunk.create({ vampire: vampireId }));

  return (
    <Card>
      <Card.Header>Creation</Card.Header>
      <Card.Body>
        <Card.Text>To create your Vampire:</Card.Text>

        <ol>
          <li>Give your Vampire a name and description</li>
          <li>
            Create a single Memory and Experience that describes your Vampire's
            history as a mortal
          </li>
          <li>Create at least three mortal Characters</li>
          <li>
            Give your Vampire three Skills that they practiced as a mortal
          </li>
          <li>
            Give your Vampire three Resources that they acquired as a mortal
          </li>
          <li>
            Create three Memories, each with one Experience relating to any two
            Characters, Skills and/or Resources that you have created
          </li>
          <li>
            Create an immortal Character who gifted or cursed your Vampire with
            undeath
          </li>
          <li>
            Create a Mark, a Memory and an Experience relating to how your
            Vampire was gifted or cursed with undeath
          </li>
        </ol>

        <Card.Text>
          Your Vampire should now have three Skills, three Resources, one Mark,
          at least three mortal Characters, one immortal Character, and five
          Memories each with one Experience.
        </Card.Text>

        <OverlayTrigger
          placement="bottom"
          delay={OVERLAY_DELAY}
          overlay={<Tooltip>Generate the first Prompt</Tooltip>}
        >
          <Button variant="outline-success" size="sm" onClick={handleStart}>
            Start
          </Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
}
