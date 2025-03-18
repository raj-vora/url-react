// url/src/components/links-list-row.tsx

// Import deps
import React from 'react'

// Create interfaces
interface LinksListRowUI {
  position: number;
  link: {
    id: number;
    author: string;
    code: string;
    url: string;
    clicks: number;
  }
  handleLinkRemove: (code: string) => void;
  addAlert: (message: string) => void;
}

// Create LinksListRow component
export const LinksListRow = (props: LinksListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.position}
    </td>

    <td className="table-item">
      {props.link.author}
    </td>


    <td className="table-item">
      <a href={props.link.code} target='_blank'>{props.link.code}</a>
      <button
        className="btn-copy"
        onClick={() => { window.navigator.clipboard.writeText(window.location.origin + "/" + props.link.code); props.addAlert('Link copied to clipboard') }}>
        Copy
      </button>
    </td>


    <td className="table-item">
      <a href={props.link.url} target='_blank'>{props.link.url}</a>
    </td>

    <td className="table-item">
      {props.link.clicks}
    </td>


    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleLinkRemove(props.link.code)}>
        Remove link
      </button>
    </td>
  </tr>
)
