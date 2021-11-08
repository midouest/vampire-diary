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
        <Card.Text>
          <ol>
            <li>Name and description</li>
            <li>First memory experience about your history</li>
            <li>Create at least three mortals</li>
            <li>Give your vampire three appropriate skills</li>
            <li>
              Give your vampire three resources that they acquired in life
            </li>
            <li>
              Create three memories, each with one experience combining two
              traits
            </li>
            <li>Create an immortal creature who turned you into a vampire</li>
            <li>
              Create a mark, a memory and experience relating to how you were
              turned
            </li>
          </ol>
        </Card.Text>

        <Button variant="outline-success" size="sm" onClick={handleStart}>
          Start
        </Button>
      </Card.Body>
    </Card>
  );
}
