import { DataGrid } from "@mui/x-data-grid";
import SearchBar from "material-ui-search-bar";
import { useEffect } from "react";
import { useState } from "react";
import "./Table.css";
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
    type: "number",
    width: 100,
  },
];

function Table() {
  const [data, setData] = useState([]);
  const [dataset, setDataSet] = useState([]);
  const [minPower, setMinPower] = useState(0);
  const [maxPower, setMaxPower] = useState(0);

  const getData = () => {
    fetch("./pokemon.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        const pokemons = [];
        for (let i = 0; i < myJson.length; i++) {
          let pokemon = myJson[i];
          pokemons.push({
            id: pokemon.id,
            name: pokemon.name,
            type: pokemon.type,
            health: pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            special_attack: pokemon.special_attack,
            special_defense: pokemon.special_defense,
            speed: pokemon.speed,
            power:
              pokemon.hp +
              pokemon.attack +
              pokemon.defense +
              pokemon.special_attack +
              pokemon.special_defense +
              pokemon.speed,
          });
        }
        setData(pokemons);
        setDataSet(pokemons);
      });
  };

  const getPower = () => {
    const power = [];
    for (let i = 0; i < dataset.length; i++) {
      power.push(dataset[i].power);
    }

    if (power.length != 0) {
      setMaxPower(Math.max(...power));
      setMinPower(Math.min(...power));
    }
  };
  useEffect(() => {
    getPower();
    getData();
  }, []);
  function searchByName(value) {
    const filteredRows = [];
    for (let i = 0; i < dataset.length; i++) {
      if (dataset[i].name.toLowerCase().includes(value)) {
        filteredRows.push(dataset[i]);
      }
    }
    setData(filteredRows);
  }
  function searchByPower(value) {
    const filteredRows = [];
    if (value > 0) {
      for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].power >= parseInt(value)) {
          filteredRows.push(dataset[i]);
        }
      }
      setData(filteredRows);
    }
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

      <div className="parent">
        <div className="child">
          <h3>Min power : </h3> {minPower}
        </div>

        <div className="child">
          <h3>Max power :</h3> {maxPower}
        </div>
      </div>
      <div style={{ height: 700, width: "80%" }}>
        <DataGrid
          rows={data}
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

export default Table;
