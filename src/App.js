import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])


  const handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    const user = { name: name, email: email };


    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser);
      })

  }


  return (
    <div className="App">
      <h1>This is react practice with node!!!</h1>
      <p>Total Users: {users.length}</p>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" /><br />
        <input type="email" name="email" id="" /><br />
        <input type="submit" value="Submit" />
      </form>

      {
        users.map(user => {
          return (
            <div key={user.id}>
              <h4>{user.id}. Name: {user.name},  Phone: {user.phone}</h4>
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
