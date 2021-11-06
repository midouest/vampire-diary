import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect } from "react";
import { queryVampires, vampireSelectors } from "./slice";
import { Table } from "react-bootstrap";

export function VampireList() {
  const dispatch = useAppDispatch();
  const allVampires = useAppSelector(vampireSelectors.selectAll);

  useEffect(() => {
    dispatch(queryVampires());
  }, [dispatch]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {allVampires.map((vampire) => (
          <tr key={vampire.id}>
            <td>{vampire.id}</td>
            <td>{vampire.name}</td>
            <td>{vampire.description}</td>
            <td>{vampire.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
