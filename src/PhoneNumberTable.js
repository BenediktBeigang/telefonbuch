import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import "./PhoneNumberTable.css";

const data = [
  { name: "John Doe", phone: "123-456-7890" },
  { name: "Jane Smith", phone: "098-765-4321" },
  { name: "Bob Johnson", phone: "111-222-3333" },
  { name: "Mary Brown", phone: "444-555-6666" },
  { name: "James Lee", phone: "777-888-9999" },
  { name: "Patricia Wilson", phone: "000-111-2222" },
  { name: "Michael Davis", phone: "333-444-5555" },
  { name: "Linda Taylor", phone: "666-777-8888" },
  { name: "Robert Anderson", phone: "999-000-1111" }
];

const PhoneNumberTable = () => {
  // extract data from a json file where one item is formated like this:

  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    fetch("../telefonbuch.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="rootPhoneNumberTable">
      <TextField
        id="searchBar"
        label="Telefonbuch durchsuchen"
        value={searchTerm}
        onChange={handleChange}
      />
      <TableContainer component={Paper} id="numberTable">
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#eeeeee" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Phone Number
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PhoneNumberTable;
