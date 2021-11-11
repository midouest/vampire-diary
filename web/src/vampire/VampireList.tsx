import "./VampireList.css";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import {
  queryVampires,
  removeVampire,
  vampireSelectors,
} from "./vampire-slice";
import { Button, Table } from "react-bootstrap";
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

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.stopPropagation();
    dispatch(removeVampire(id));
  };

  return (
    <Table hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Game Over</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {allVampires.map((vampire) => (
          <tr
            className="vampire-list-item"
            key={vampire.id}
            onClick={() => navigate(`/vampires/${vampire.id}`)}
          >
            <td>{vampire.name}</td>
            <td>{vampire.description}</td>
            <td>{vampire.isDead ? "Yes" : "No"}</td>
            <td>
              <Button
                variant="outline-danger"
                onClick={(event) => handleDelete(event, vampire.id)}
              >
                <i className="bi bi-x-lg me-2"></i>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
