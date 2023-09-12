import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import SearchBar from "material-ui-search-bar";
import "./App.css";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "name", width: 130 },
  { field: "type", headerName: "type", width: 130 },
  {
    field: "health",
    headerName: "health",
    type: "number",
    width: 90,
  },
  {
    field: "attack",
    headerName: "attack",
    type: "number",
    width: 90,
  },
  {
    field: "defense",
    headerName: "defense",
    type: "number",
    width: 90,
  },
  {
    field: "special_attack",
    headerName: "special_attack",
    type: "number",
    width: 130,
  },
  {
    field: "special_defense",
    headerName: "special_defense",
    type: "number",
    width: 130,
  },
  {
    field: "speed",
    headerName: "speed",
    type: "number",
    width: 90,
  },
  {
    field: "power",
    headerName: "power",
    width: 100,
    valueGetter: (params) =>
      `${
        params.row.health +
        params.row.attack +
        params.row.defense +
        params.row.special_attack +
        params.row.special_defense +
        params.row.speed
      }`,
  },
];

function App() {
  const [pokemons, setPokemons] = useState([]);
  const dataset = [];
  useEffect(() => {
    axios
      .get("./pokemon.json")
      .then((res) => setPokemons(res.data))
      .catch((err) => console.log(err));
  }, []);
  pokemons.map((pokemon) =>
    dataset.push({
      id: pokemon.id,
      name: pokemon.name,
      type: pokemon.type,
      health: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      special_attack: pokemon.special_attack,
      special_defense: pokemon.special_defense,
      speed: pokemon.speed,
    })
  );
  function searchByName(value) {
    //TODO: implement search by name logic
  }
  function searchByPower(value) {
    //TODO: implement search by name logic
  }

  return (
    <div>
      <div className="parent">
        <div className="child">
          <SearchBar onChange={(event) => searchByName(event)} />
        </div>
        <div className="child">
          <SearchBar
            placeholder="power threshold"
            onChange={(event) => searchByPower(event)}
          />
        </div>
      </div>

      <div style={{ height: 700, width: "80%" }}>
        <DataGrid
          rows={dataset}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}

export default App;
