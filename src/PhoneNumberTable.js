import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import styles from "./PhoneNumberTable.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const GET_PEOPLE = gql`
  query GetPeople {
    people {
      name
      phone
    }
  }
`;

const PhoneNumberTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [people, setPeople] = useState([{ name: "", phone: ""}]);

  useEffect(() => {
    client
      .query({
        query: GET_PEOPLE,
      })
      .then((result) => {
        setPeople(result.data.people);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten:", error);
      });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = people.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
    || item.phone.includes(searchTerm)
  );

  return (
    <div id={styles.rootPhoneNumberTable}>
      <h1 id={styles.title}>Telefonbuch</h1>
      <div id={styles.searchWrapper}>
        <TextField
          id={styles.searchBar}
          label="Telefonbuch durchsuchen"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <TableContainer component={Paper} id={styles.numberTable}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#00858555" }}>
              <TableCell
                className={styles.tableCell}
                sx={{ fontWeight: "bold" }}
              >
                Name
              </TableCell>
              <TableCell
                className={styles.tableCell}
                sx={{ fontWeight: "bold" }}
                align="right"
              >
                Telefonnummer
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={`${row.name}-${index}`}>
                <TableCell
                  className={styles.tableCell}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell className={styles.tableCell} align="right">
                  {row.phone}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PhoneNumberTable;
