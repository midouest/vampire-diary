import { useAppDispatch, useAppSelector } from "app/hooks";
import { OVERLAY_DELAY } from "common/constants";
import { useEffect } from "react";
import {
  Button,
  Accordion,
  Row,
  Col,
  Spinner,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { useParams } from "react-router";
import { CharacterList } from "./CharacterList";
import { CreationCard } from "./CreationCard";
import { VAMPIRE_MEMORY_CAPACITY } from "./diary-constants";
import {
  experienceSelectors,
  markSelectors,
  selectCurrentEvent,
  selectCurrentEventIndex,
  selectSkills,
  selectVampire,
  selectMemories,
  selectResources,
  selectCharacters,
} from "./diary-slice";
import {
  characterThunk,
  markThunk,
  memoryThunk,
  resourceThunk,
  retrieveDeepVampire,
  skillThunk,
} from "./diary-thunk";
import { JournalCard } from "./JournalCard";
import { MarkList } from "./MarkList";
import { MemoryList } from "./MemoryList";
import { ResourceList } from "./ResourceList";
import { SkillList } from "./SkillList";
import { VampireForm } from "./VampireForm";

export function DiaryPage() {
  const { id } = useParams();
  const vampireId = parseInt(id!);

  const dispatch = useAppDispatch();

  const vampire = useAppSelector(selectVampire);
  const currentIndex = useAppSelector(selectCurrentEventIndex);
  const currentEvent = useAppSelector(selectCurrentEvent);

  const memories = useAppSelector(selectMemories);
  const hasMaxMemories = memories.length >= VAMPIRE_MEMORY_CAPACITY;

  const experiences = useAppSelector(experienceSelectors.selectAll);
  const skills = useAppSelector(selectSkills);
  const characters = useAppSelector(selectCharacters);
  const resources = useAppSelector(selectResources);
  const marks = useAppSelector(markSelectors.selectAll);

  useEffect(() => {
    dispatch(retrieveDeepVampire(vampireId));
  }, [vampireId, dispatch]);

  const handleCreateMemory = () =>
    dispatch(memoryThunk.create({ vampire: vampireId }));

  const handleCreateSkill = () =>
    dispatch(skillThunk.create({ vampire: vampireId, description: "" }));

  const handleCreateResource = () =>
    dispatch(
      resourceThunk.create({
        vampire: vampireId,
        description: "",
        isDiary: false,
      })
    );

  const handleCreateCharacter = () =>
    dispatch(
      characterThunk.create({
        vampire: vampireId,
        name: "",
        description: "",
        isImmortal: false,
      })
    );

  const handleCreateMark = () =>
    dispatch(markThunk.create({ vampire: vampireId, description: "" }));

  if (!vampire) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className="my-3">
      <Row>
        <Col md className="mb-3">
          <Accordion defaultActiveKey="vampire">
            <AccordionItem eventKey="vampire">
              <AccordionHeader>Vampire</AccordionHeader>
              <AccordionBody>
                <VampireForm vampire={vampire} />
              </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="memories">
              <AccordionHeader>Memories</AccordionHeader>
              <AccordionBody>
                <OverlayTrigger
                  placement="right"
                  delay={OVERLAY_DELAY}
                  overlay={
                    <Tooltip>
                      {hasMaxMemories
                        ? "A Vampire can only remember five Memories"
                        : "Add a new Memory"}
                    </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <Button
                      disabled={hasMaxMemories}
                      variant="outline-success"
                      onClick={handleCreateMemory}
                    >
                      Create
                    </Button>
                  </span>
                </OverlayTrigger>
                <MemoryList memories={memories} experiences={experiences} />
              </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="skills">
              <AccordionHeader>Skills</AccordionHeader>
              <AccordionBody>
                <OverlayTrigger
                  placement="right"
                  delay={OVERLAY_DELAY}
                  overlay={<Tooltip>Add a new Skill</Tooltip>}
                >
                  <Button variant="outline-success" onClick={handleCreateSkill}>
                    Create
                  </Button>
                </OverlayTrigger>
                <SkillList skills={skills} />
              </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="resources">
              <AccordionHeader>Resources</AccordionHeader>
              <AccordionBody>
                <OverlayTrigger
                  placement="right"
                  delay={OVERLAY_DELAY}
                  overlay={<Tooltip>Add a new Resource</Tooltip>}
                >
                  <Button
                    variant="outline-success"
                    onClick={handleCreateResource}
                  >
                    Create
                  </Button>
                </OverlayTrigger>
                <ResourceList resources={resources} />
              </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="characters">
              <AccordionHeader>Characters</AccordionHeader>
              <AccordionBody>
                <OverlayTrigger
                  placement="right"
                  delay={OVERLAY_DELAY}
                  overlay={<Tooltip>Add a new Character</Tooltip>}
                >
                  <Button
                    variant="outline-success"
                    onClick={handleCreateCharacter}
                  >
                    Create
                  </Button>
                </OverlayTrigger>
                <CharacterList characters={characters} />
              </AccordionBody>
            </AccordionItem>
            <AccordionItem eventKey="marks">
              <AccordionHeader>Marks</AccordionHeader>
              <AccordionBody>
                <OverlayTrigger
                  placement="right"
                  delay={OVERLAY_DELAY}
                  overlay={<Tooltip>Add a new Mark</Tooltip>}
                >
                  <Button variant="outline-success" onClick={handleCreateMark}>
                    Create
                  </Button>
                </OverlayTrigger>
                <MarkList marks={marks} />
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </Col>
        <Col md>
          {currentEvent && currentIndex !== undefined ? (
            <JournalCard
              vampireId={vampireId}
              currentIndex={currentIndex}
              currentEvent={currentEvent}
            />
          ) : (
            <CreationCard vampireId={vampireId} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
