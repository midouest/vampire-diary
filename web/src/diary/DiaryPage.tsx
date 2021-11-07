import { useAppDispatch } from "app/hooks";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router";

export function DiaryPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const vampireId = parseInt(id!);

  useEffect(() => {}, [vampireId, dispatch]);

  return (
    <Container>
      <Row></Row>
    </Container>
  );
}
