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
        const sortedPeople = [...result.data.people].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setPeople(sortedPeople);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten:", error);
        const dummyData = [
          { name: "Max Mustermann", phone: "123456789" },
          { name: "Erika Mustermann", phone: "987654321" },
          { name: "Hans Müller", phone: "456789123" },
          { name: "Anna Müller", phone: "321654987" },
          { name: "Gabi Meier", phone: "789123456" },
          { name: "Klaus Schmidt", phone: "654321987" },
          { name: "Petra Schmitz", phone: "147258369" },
          { name: "Karl Schulz", phone: "369258147" },
          { name: "Gabi Meier", phone: "789133456" },
          { name: "Klaus Schmidt", phone: "654361987" },
          { name: "Petra Schmitz", phone: "147358369" },
          { name: "Karl Schulz", phone: "369252147" },
        ];
        setPeople(dummyData);
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
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                backgroundColor: "#ffffff33",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiFormLabel-root.Mui-focused": {
              color: "white",
            },
          }}
        />
      </div>
      <div id={styles.numberTableWrapper}>
        <TableContainer component={Paper} id={styles.numberTable}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
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
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    className={styles.tableCell}
                    align="right"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    {row.phone}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default PhoneNumberTable;
