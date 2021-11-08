import "./VampireList.css";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { queryVampires, vampireSelectors } from "./vampire-slice";
import { Table } from "react-bootstrap";
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

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Game Over</th>
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
