import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'

import { useState } from 'react'

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState("inbox")
  const [searchString, setSearchString] = useState("")
  

  console.log(initialEmails)

  // Create a function that rerenders only the unread emails
  function filterEmails() {
    if(!(currentTab === "inbox")) {
      return (hideRead ? emails.filter(email => email.read && emails.starred) : emails.filter(email => email.starred)).filter(email => {
        return email.sender.toLowerCase().includes(searchString) || email.title.toLowerCase().includes(searchString)
      })
    }
    return (hideRead ? emails.filter(email => email.read) : emails).filter(email => {
      return email.sender.toLowerCase().includes(searchString) || email.title.toLowerCase().includes(searchString)
    })
  }
  let emailsToRender = filterEmails()

  //Create a function for an onClick that will change the state and change the class
  function changeCurrentTabToInbox() {
    setCurrentTab("inbox")
  }
  function changeCurrentTabToStarred() {
    setCurrentTab("starred")
  }

  //Create a function that counts and returns the number of unread emails 
  let unreadEmailsCount = emails.filter(email => !email.read).length

  //Create a function that counts and returns the number of stars emails
  let starredEmailsCount = emails.filter(email => email.starred).length

  const toggleRead = (targetEmail) => {
    setEmails(emails.map(function(email) {
        return email.id === targetEmail.id ? {...targetEmail, read: !targetEmail.read} : email
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
      <header className="header">
        <div className="left-menu">
          <svg className="menu-icon" focusable="false" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>

          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png"
            alt="gmail logo"
          />
        </div>

        <div className="search">
          <input onChange={((e) => setSearchString(e.target.value.toLowerCase()))} className="search-bar" placeholder="Search mail" />
        </div>
      </header>
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === "inbox" ? "active" : null}`}
            onClick={() => {changeCurrentTabToInbox()}}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmailsCount}</span>
          </li>
          <li
            className={`item ${currentTab === "starred" ? "active" : null}`}
            onClick={() => {changeCurrentTabToStarred()}}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmailsCount}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(event) => {setHideRead(event.target.checked)}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
        {emailsToRender.map(email => {
          return (
          <li key={email.id.toString()} className={`email ${email.read ? "read" : "unread" }`}>
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
