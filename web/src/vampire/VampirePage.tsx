import { useAppDispatch, useAppSelector } from "app/hooks";
import { useState } from "react";
import {
  Container,
  Button,
  Modal,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { CreateVampireForm } from "./CreateVampireForm";
import { CreateVampireFormData } from "./vampire-model";
import {
  createVampire,
  removeVampire,
  vampireSelectors,
} from "./vampire-slice";
import { VampireList } from "./VampireList";

export function VampirePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allVampires = useAppSelector(vampireSelectors.selectAll);

  const [show, setShow] = useState(false);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const handleCreate = async (formData: CreateVampireFormData) => {
    const vampire = await dispatch(createVampire(formData)).unwrap();
    hideModal();
    navigate(`/vampires/${vampire.id}`);
  };

  const handleDelete = (id: number) => {
    dispatch(removeVampire(id));
  };

  return (
    <Container className="mt-3">
      <Button variant="outline-success" className="mb-3" onClick={showModal}>
        Create
      </Button>
      <DropdownButton
        as={ButtonGroup}
        disabled={allVampires.length === 0}
        title="Delete"
        variant="outline-danger"
        className="ms-3 mb-3"
      >
        {allVampires.map((vampire) => (
          <Dropdown.Item
            key={vampire.id}
            onClick={() => handleDelete(vampire.id)}
          >
            {vampire.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <VampireList />

      <Modal show={show} onHide={hideModal}>
        <CreateVampireForm onCancel={hideModal} onSubmit={handleCreate} />
      </Modal>
    </Container>
  );
}
