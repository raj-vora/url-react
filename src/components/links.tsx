// url/src/components/links.tsx

// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { LinksList } from './links-list.tsx'

// Import styles
import './../styles/links.css'

// Create LinksList component
export const Links = () => {
  // Prepare states
  const token = localStorage.getItem('token');
  const author = localStorage.getItem('username');
  const [code, setCode] = useState('')
  const [url, setUrl] = useState('')
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)
  const mainUrl = process.env.REACT_APP_API_URL;

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  // Fetch all links on initial render
  useEffect(() => {
    fetchLinks()
  }, [])

  // Fetch all links
  const fetchLinks = async () => {
    // Send GET request to 'links/all' endpoint
    axios
      .get(mainUrl + "/links/all/" + author)
      .then(response => {
        // Update the links state
        setLinks(response.data)
        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the link list: ${error}`))
  }

  // Reset all input fields
  const handleInputsReset = () => {
    setCode('')
    setUrl('')
  }

  // Create new link
  const handleLinkCreate = () => {
    // Send POST request to 'links/create' endpoint
    axios
      .post(mainUrl + '/links/create', {
        author: author,
        code: code,
        url: url,
      })
      .then(res => {

        // Fetch all links to refresh
        // the links on the links list
        fetchLinks()
      })
      .catch(error => console.error(`There was an error creating the ${code} link: ${error}`))
  }

  // Submit new link
  const handleLinkSubmit = () => {
    // Check if all fields are filled
    if (code.length > 0 && url.length > 0) {
      // Create new link
      handleLinkCreate()

      console.info(`Code ${code} by ${author} added.`)

      // Reset all input fields
      handleInputsReset()
    }
  }

  // Remove link
  const handleLinkRemove = (id: number, code: string) => {
    // Send PUT request to 'links/delete' endpoint
    axios
      .put(mainUrl + '/links/delete', { id: id })
      .then(() => {

        // Fetch all links to refresh
        // the links on the links list
        fetchLinks()
      })
      .catch(error => console.error(`There was an error removing the ${code} link: ${error}`))
  }

  // Reset links list (remove all links)
  const handleListReset = () => {
    // Send PUT request to 'links/reset' endpoint
    axios.put(mainUrl + '/links/reset')
      .then(() => {
        // Fetch all links to refresh
        // the links on the links list
        fetchLinks()
      })
      .catch(error => console.error(`There was an error resetting the link list: ${error}`))
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.location.href = '/login';
  }

  return (
    <div className="link-list-wrapper">
      {/* Form for creating new link */}
      <div className="link-list-form">
        <div className="form-wrapper" onSubmit={handleLinkSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="code">Enter code:</label>
              <input className="form-input" type="text" id="code" name="code" value={code} onChange={(e) => setCode(e.currentTarget.value)} />
            </fieldset>
            <fieldset>
              <label className="form-label" htmlFor="url">Enter URL:</label>
              <input className="form-input" type="text" id="url" name="url" value={url} onChange={(e) => setUrl(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>

        <button onClick={handleLinkSubmit} className="btn btn-add">Create link</button>
      </div>

      {/* Render links list component */}
      <LinksList links={links} loading={loading} handleLinkRemove={handleLinkRemove} />

      <button onClick={logout} className='btn btn-reset'>Logout</button>
    </div>
  )
}