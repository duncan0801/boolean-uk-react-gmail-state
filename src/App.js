import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'

import { useState } from 'react'

function App() {
  const [emails, setEmails] = useState(initialEmails)

  console.log(initialEmails)


  const toggleRead = (email) => {

    setEmails(emails.map(function(item) {
      
        if(item.id === email.id) {
          console.log(email)
          return {...email, read: !email.read}
        }
        else {
          return item
        }
    }))
  }

  const toggleStar = (email) => {
    setEmails(emails.map((item) => {
      if(item.id === email.id) {
        return {...email, starred: !email.starred }
      }
      else {
        return item
      }
    }))
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
        {emails.map(email => {
                return (<li className="email">
                          <input  checked={email.read} onChange={() => toggleRead(email)} type="checkbox"/>
                          <input className="star-checkbox" type="checkbox" checked={email.starred} onChange={() => toggleStar(email)}/>
                          <span >{email.sender}</span>
                          <span className="title">{email.title}</span>
                  </li>) 
        })
        }
        </ul>
        
      </main>
    </div>
  )
}

export default App
