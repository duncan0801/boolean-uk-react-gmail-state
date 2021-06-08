import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'

import { useState } from 'react'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [cheked, setChecked] =useState(false)
  console.log(initialEmails)

  const renderEmails = () => {
    
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
        {
        emails.map(function(email) {
                return (<li className="email">
                          <input type="checkbox"/>
                          <input className="star-checkbox" type="checkbox"/>
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
