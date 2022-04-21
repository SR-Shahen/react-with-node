import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handelFromSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email }
    console.log(user);

    // post server data
    fetch('http://localhost:5000/user', {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data]
        setUsers(newUsers)
        console.log(data);
      })
  }
  return (
    <div className="App">
      <form onSubmit={handelFromSubmit}>
        <input type="text" name="name" id="" placeholder='enter yout name' required />
        <input type="email" name="email" id="" placeholder='enter your email' required />
        <input type="submit" value="submit" />
      </form>
      <h3>user length:{users.length}</h3>
      {
        users.map(user => <p key={user.id}> id: {user.id}  name: {user.name}  . Email:{user.email}</p>)
      }

    </div>
  );
}

export default App;
