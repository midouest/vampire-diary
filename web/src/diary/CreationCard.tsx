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
      <Card.Body>
        <Card.Title>Creation</Card.Title>
        <Card.Text>
          Start by imagining a person in the distant past—a Roman emperor, a
          Mesopotamian midwife, a French knight. This person will become your
          vampire. Imagine when and where they were born and who they were in
          life. Start a Memory with one Experience that encapsulates their
          history. For instance: “I am Henri, son of Jon, born near the Loire
          Valley in the 13th Century of Our Lord; I am a poor knight swindled
          out of my inheritance.”
        </Card.Text>
        <Card.Text>
          This first Experience is a little different than most Experiences, in
          that it’s a broad summary of the vampire’s life before becoming an
          undead thing. This Experience will be slotted into the character
          record’s first Memory.
        </Card.Text>
        <Card.Text>
          Next, create at least three Mortals and add them to the vampire’s
          record sheet. These Mortals will have a relationship with your
          vampire—relatives, friends and lovers, enemies, mentors, debtors, or
          anything else appropriate for the time and place you have chosen.
          Describe each Character in a few words. Know that these Characters can
          and should be very important, but will not be around for long.
        </Card.Text>
        <Card.Text>
          Give your vampire-to-be three Skills fitting for their lot in life,
          and three Resources they obtained while still mortal. Remember,
          Resources can be almost anything. Big or small, a Resource is a
          Resource whether it’s an obsidian knife or a fleet of warships.
        </Card.Text>
        <Card.Text>
          Then, create three more Experiences—with one Experience each being
          entered into a separate Memory. Each of these Experiences should
          combine two of your vampire’s traits. If your vampire has the Longship
          Bøkesuden as a Resource and the Character “Gundar, a Viking jarl, like
          a father to me, you might write an Experience like Gundar takes me on
          my first voyage aboard the Longship Bøkesuden; his touch calms me when
          we first leave sight of land.”
        </Card.Text>
        <Card.Text>
          Lastly, create an Immortal. This is the creature that gifted (or
          cursed) your vampire with unlife. Create a Mark and an Experience that
          explains how your vampire became a creature of the night. One such
          Immortal is “Baron Hollmueller, an Austrian noble and a vampire; he
          stole the deed to my land. The corresponding Experience might be I
          duel the eerie Baron Hollmueller across the roof of the abbey; he
          nearly cuts my head from my shoulders but I do not die, which leads to
          the Mark My neck is permanently broken, I wear tight scarves and walk
          slowly to maintain my dignity.”
        </Card.Text>

        <Card.Text>
          Once you have finished with your vampire, they will have three Skills,
          three Resources, a Mark, at least three Mortals, one Immortal, and one
          Experience in each of their five Memories.
        </Card.Text>

        <Button variant="outline-success" size="sm" onClick={handleStart}>
          Start
        </Button>
      </Card.Body>
    </Card>
  );
}
