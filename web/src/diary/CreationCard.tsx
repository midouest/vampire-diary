import { useAppDispatch } from "app/hooks";
import { Card, Button } from "react-bootstrap";
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
        <Card.Text>To create your vampire:</Card.Text>

        <ol>
          <li>Give your vampire a name and description</li>
          <li>
            Create a single memory and experience that describes your vampire's
            history as a mortal
          </li>
          <li>Create at least three mortal characters</li>
          <li>
            Give your vampire three skills that they practiced as a mortal
          </li>
          <li>
            Give your vampire three resources that they acquired as a mortal
          </li>
          <li>
            Create three memories, each with one experience relating to any two
            characters, skills and/or resources that you have created
          </li>
          <li>
            Create an immortal character who gifted or cursed your vampire with
            undeath
          </li>
          <li>
            Create a mark, memory and experience relating to how your vampire
            was gifted or cursed with undeath
          </li>
        </ol>

        <Card.Text>
          Your vampire should now have three skills, three resources, one mark,
          at least three mortals, one immortal, and five memories each with one
          experience.
        </Card.Text>

        <Button variant="outline-success" size="sm" onClick={handleStart}>
          Start
        </Button>
      </Card.Body>
    </Card>
  );
}
