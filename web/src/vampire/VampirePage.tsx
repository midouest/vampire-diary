import { useAppDispatch } from "app/hooks";
import { OVERLAY_DELAY } from "common/constants";
import { useState } from "react";
import {
  Container,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { CreateVampireForm } from "./CreateVampireForm";
import { CreateVampireFormData } from "./vampire-model";
import { createVampire } from "./vampire-slice";
import { VampireList } from "./VampireList";

export function VampirePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const handleCreate = async (formData: CreateVampireFormData) => {
    const vampire = await dispatch(createVampire(formData)).unwrap();
    hideModal();
    navigate(`/vampires/${vampire.id}`);
  };

  return (
    <Container className="mt-3" fluid>
      <OverlayTrigger
        placement="bottom"
        delay={OVERLAY_DELAY}
        overlay={<Tooltip>Create a new Vampire</Tooltip>}
      >
        <Button variant="outline-success" className="mb-3" onClick={showModal}>
          <i className="bi bi-plus-lg me-2"></i>
          Create
        </Button>
      </OverlayTrigger>

      <VampireList />

      <Modal show={show} onHide={hideModal}>
        <CreateVampireForm onCancel={hideModal} onSubmit={handleCreate} />
      </Modal>
    </Container>
  );
}
