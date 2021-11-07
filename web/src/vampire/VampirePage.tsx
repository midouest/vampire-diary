import { useAppDispatch } from "app/hooks";
import { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { CreateVampireForm } from "./CreateVampireForm";
import { CreateVampireFormData } from "./model";
import { createVampire } from "./slice";
import { VampireList } from "./VampireList";

export function VampirePage() {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const onCreate = (formData: CreateVampireFormData) => {
    dispatch(createVampire(formData));
    hideModal();
  };

  return (
    <Container className="mt-3">
      <Button className="mb-3" onClick={showModal}>
        Create
      </Button>
      <VampireList />

      <Modal show={show} onHide={hideModal}>
        <CreateVampireForm onCancel={hideModal} onSubmit={onCreate} />
      </Modal>
    </Container>
  );
}
