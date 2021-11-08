import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import {
  queryVampires,
  removeVampire,
  vampireSelectors,
} from "./vampire-slice";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export function VampireList() {
  const dispatch = useAppDispatch();
  const allVampires = useAppSelector(vampireSelectors.selectAll);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      queryVampires({
        sort: ["created_at", "-"],
      })
    );
  }, [dispatch]);

  const handleDelete = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    dispatch(removeVampire(id));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Game Over</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {allVampires.map((vampire) => (
          <tr
            key={vampire.id}
            onClick={() => navigate(`/vampires/${vampire.id}`)}
          >
            <td>{vampire.name}</td>
            <td>{vampire.description}</td>
            <td>{vampire.isDead ? "Yes" : "No"}</td>
            <td>
              <Button
                size="sm"
                variant="outline-danger"
                className="ms-3"
                onClick={(event) => handleDelete(event, vampire.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
