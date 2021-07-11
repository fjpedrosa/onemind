import "./App.css";
import "./main.css";
import data from "./data/users.json";
import List from "./components/List/List";
import { useEffect, useState, useRef } from "react";
// age: 20
// animals: (5) ["cat", "horse", "elephant", "tiger", "gorilla"]
// id: "5fbfe211d32e20623de48785"
// isActive: false
// name:
// given: "Irma"
// surname: "Mendez"
// __proto__: Object
// points: 28

function App() {
  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(undefined);
  const [users, setUsers] = useState(data);

  const usersRef = useRef();
  usersRef.current = users;
  useEffect(() => {
    // I'm getting al possible animals
    let animals = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      element.animals.forEach((el) => {
        if (!animals.includes(el)) animals.push(el);
      });
    }
    setSelectedAnimal(animals[0]);
    setAnimals(animals);
  }, []);

  useEffect(() => {
    setUsers(
      data
        .filter(
          (user) =>
            user.animals.includes(selectedAnimal) && user.isActive === true
        )
        .sort((a, b) => b.points - a.points)
    );
  }, [selectedAnimal]);

  const handleAnimalChange = (e) => {
    setSelectedAnimal(e.target.value);
  };

  if (!animals.length) return null;

  return (
    <div className="App">
      <select value={selectedAnimal} onChange={handleAnimalChange}>
        {animals.map((animal) => (
          <option key={animal} value={animal}>
            {animal}
          </option>
        ))}
      </select>
      <List data={users} animal={selectedAnimal} />
    </div>
  );
}

export default App;
