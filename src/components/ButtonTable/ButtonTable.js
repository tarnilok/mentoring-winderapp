import React, { useState, useId } from "react";
import styling from "./ButtonTable.module.scss";

const ButtonTable = ({ ApiFetcher, fetchPerson }) => {
  const [showTable, setShowTable] = useState(false);
  const [addListToTable, setAddListToTable] = useState([]);
  //   const id = useId();

  const addList = () => {
    setAddListToTable([
      ...addListToTable,
      {
        Name: `${fetchPerson?.name?.title} ${fetchPerson?.name?.first} ${fetchPerson?.name?.last}`,
        Email: `${fetchPerson?.email}`,
        Phone: `${fetchPerson?.phone}`,
        Age: `${fetchPerson?.dob?.age}`,
      },
    ]);
  };

  return (
    <>
      <div className={styling.buttons}>
        <button className={styling.newuser} onClick={ApiFetcher}>
          NEW USER
        </button>
        <button
          className={styling.adduser}
          onClick={() => {
            setShowTable(true);
            addList();
          }}
        >
          ADD USER
        </button>
      </div>
      <table className={styling.table}>
        {showTable ? (
          <thead>
            <tr className={styling.title}>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
            </tr>
          </thead>
        ) : null}
        <tbody>
          {addListToTable?.map((info, id) => {
            return (
              <tr key={id}>
                <td>{info.Name}</td>
                <td>{info.Email}</td>
                <td>{info.Phone}</td>
                <td>{info.Age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ButtonTable;
