import React, {useEffect, useState} from 'react';
import data from "./dummyData.js"
export function App(props) {

  const [userData, setUserData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sort, setSort] = useState(false);

  const nameChange = (e) => {
    let name = e.target.value;
    setName(name);
  }

  const ageChange = (e) => {
    let age = e.target.value;
    setAge(age);
  }

  const addUser = () => {
    let user = {
      name,
      age
    }
    setUserData(prevData => 
      prevData.concat(user) 
    )

    setAge('');
    setName('');
  }

  const deleteUser = (user) => {
    console.log(user);
    setUserData(prevData => prevData.filter((value) => user.name != value.name))
  }

  const sortTable = () => {

    let sortedRes = userData.sort((a,b) => {
        if(sort) {
          return a.age-b.age
        }
        else {
          return b.age-a.age
        }
      });
    setUserData(sortedRes);
    setSort(prev => !prev)
  }

  useEffect(() => {

    async function getData() {
      // let res = await fetch("url");
      // let data = await res.json();
      setUserData(data);
    }

    getData();
  },[])

  return (
    <div className='App'>

      <div>
        <label>
          User List
        </label>
        <div>
          <table>

          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Age
              </th>
              <th>
                Sort
                <button onClick={sortTable} > {sort? "↑": "↓" } </button>
              </th>
            </tr>
          </thead>
          <tbody>
          { userData.map((value, index) => {
              return <tr key={index}>
                <td>
                  {value.name}
                </td>
                <td>
                  {value.age}
                </td>
                <td>
                  <button onClick={() => deleteUser(value)}> Delete</button>
                </td>
              </tr>
            })
          }
          </tbody>
          
          </table>
        </div>
        
      </div>

      <div>
        <label> Name</label>
        <input 
          onChange={nameChange}
          value={name}
        />

        <label> Age</label>
        <input 
          onChange={ageChange}
          value={age}
        />

        <button onClick={addUser}> Add user </button>
      </div>
      

    </div>
  );
}