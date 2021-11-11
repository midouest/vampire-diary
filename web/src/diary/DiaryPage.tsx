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
  ToggleButton,
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
  selectSkills,
  selectVampire,
  selectMemories,
  selectResources,
  selectCharacters,
  selectShowAllMemories,
  selectShowAllSkills,
  selectShowAllResources,
  selectShowAllCharacters,
  toggleShowAllSkills,
  toggleShowAllResources,
  toggleShowAllCharacters,
  toggleShowAllMemories,
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
  const currentEvent = useAppSelector(selectCurrentEvent);

  const memories = useAppSelector(selectMemories);
  const hasMaxMemories = memories.length >= VAMPIRE_MEMORY_CAPACITY;

  const experiences = useAppSelector(experienceSelectors.selectAll);
  const skills = useAppSelector(selectSkills);
  const characters = useAppSelector(selectCharacters);
  const resources = useAppSelector(selectResources);
  const marks = useAppSelector(markSelectors.selectAll);

  const showAllMemories = useAppSelector(selectShowAllMemories);
  const showAllSkills = useAppSelector(selectShowAllSkills);
  const showAllResources = useAppSelector(selectShowAllResources);
  const showAllCharacters = useAppSelector(selectShowAllCharacters);

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

  const handleShowAllMemories = () => dispatch(toggleShowAllMemories());
  const handleShowAllSkills = () => dispatch(toggleShowAllSkills());
  const handleShowAllResources = () => dispatch(toggleShowAllResources());
  const handleShowAllCharacters = () => dispatch(toggleShowAllCharacters());

  if (!vampire) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className="my-3" fluid>
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
                      <i className="bi bi-plus-lg"></i>
                      <span className="ms-2 d-none d-lg-inline">Create</span>
                    </Button>
                  </span>
                </OverlayTrigger>
                <ToggleButton
                  type="checkbox"
                  value="1"
                  variant="outline-primary"
                  className="ms-3"
                  checked={showAllMemories}
                  onClick={handleShowAllMemories}
                >
                  <i className="bi bi-eye"></i>
                  <span className="ms-2 d-none d-lg-inline">
                    Show Forgotten
                  </span>
                </ToggleButton>
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
                    <i className="bi bi-plus-lg"></i>
                    <span className="ms-2 d-none d-lg-inline">Create</span>
                  </Button>
                </OverlayTrigger>
                <ToggleButton
                  type="checkbox"
                  value="2"
                  variant="outline-primary"
                  className="ms-3"
                  checked={showAllSkills}
                  onClick={handleShowAllSkills}
                >
                  <i className="bi bi-eye"></i>
                  <span className="ms-2 d-none d-lg-inline">Show Checked</span>
                </ToggleButton>
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
                    <i className="bi bi-plus-lg"></i>
                    <span className="ms-2 d-none d-lg-inline">Create</span>
                  </Button>
                </OverlayTrigger>
                <ToggleButton
                  type="checkbox"
                  value="3"
                  variant="outline-primary"
                  className="ms-3"
                  checked={showAllResources}
                  onClick={handleShowAllResources}
                >
                  <i className="bi bi-eye"></i>
                  <span className="ms-2 d-none d-lg-inline">Show Lost</span>
                </ToggleButton>
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
                    <i className="bi bi-plus-lg"></i>
                    <span className="ms-2 d-none d-lg-inline">Create</span>
                  </Button>
                </OverlayTrigger>
                <ToggleButton
                  type="checkbox"
                  value="4"
                  variant="outline-primary"
                  className="ms-3"
                  checked={showAllCharacters}
                  onClick={handleShowAllCharacters}
                >
                  <i className="bi bi-eye"></i>
                  <span className="ms-2 d-none d-lg-inline">Show Dead</span>
                </ToggleButton>
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
                    <i className="bi bi-plus-lg"></i>
                    <span className="ms-2 d-none d-lg-inline">Create</span>
                  </Button>
                </OverlayTrigger>
                <MarkList marks={marks} />
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </Col>
        <Col md>
          {currentEvent ? (
            <JournalCard vampireId={vampireId} currentEvent={currentEvent} />
          ) : (
            <CreationCard vampireId={vampireId} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
