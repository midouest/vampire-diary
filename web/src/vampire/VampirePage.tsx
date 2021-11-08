import { useAppDispatch } from "app/hooks";
import { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
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

  const onCreate = async (formData: CreateVampireFormData) => {
    const vampire = await dispatch(createVampire(formData)).unwrap();
    hideModal();
    navigate(`/vampires/${vampire.id}`);
  };

  return (
    <Container className="mt-3">
      <Button variant="success" className="mb-3" onClick={showModal}>
        Create
      </Button>
      <VampireList />

      <Modal show={show} onHide={hideModal}>
        <CreateVampireForm onCancel={hideModal} onSubmit={onCreate} />
      </Modal>
    </Container>
  );
}
