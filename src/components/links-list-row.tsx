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
  handleLinkRemove: (id: number, code: string) => void;
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
        onClick={() => props.handleLinkRemove(props.link.id, props.link.code)}>
        Remove link
      </button>
    </td>
  </tr>
)