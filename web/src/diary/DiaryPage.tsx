import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { CharacterList } from "./CharacterList";
import {
  characterSelectors,
  experienceSelectors,
  markSelectors,
  memorySelectors,
  resourceSelectors,
  selectVampire,
  skillSelectors,
} from "./diary-slice";
import {
  characterThunk,
  markThunk,
  memoryThunk,
  resourceThunk,
  retrieveDeepVampire,
  skillThunk,
} from "./diary-thunk";
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
  const memories = useAppSelector(memorySelectors.selectAll);
  const experiences = useAppSelector(experienceSelectors.selectAll);
  const skills = useAppSelector(skillSelectors.selectAll);
  const characters = useAppSelector(characterSelectors.selectAll);
  const resources = useAppSelector(resourceSelectors.selectAll);
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
    return <></>;
  }

  return (
    <Container>
      <Row>
        <h2>Vampire</h2>
        <VampireForm vampire={vampire} />
      </Row>
      <Row>
        <h2>Memories</h2>
        <Button onClick={handleCreateMemory}>Create Memory</Button>
        <MemoryList memories={memories} experiences={experiences} />
      </Row>
      <Row>
        <h2>Skills</h2>
        <Button onClick={handleCreateSkill}>Create Skill</Button>
        <SkillList skills={skills} />
      </Row>
      <Row>
        <h2>Resources</h2>
        <Button onClick={handleCreateResource}>Create Resource</Button>
        <ResourceList resources={resources} />
      </Row>
      <Row>
        <h2>Characters</h2>
        <Button onClick={handleCreateCharacter}>Create Character</Button>
        <CharacterList characters={characters} />
      </Row>
      <Row>
        <h2>Marks</h2>
        <Button onClick={handleCreateMark}>Create Mark</Button>
        <MarkList marks={marks} />
      </Row>
    </Container>
  );
}
