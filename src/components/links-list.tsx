// url/src/components/links-list.tsx

// Import deps
import React from 'react'

// Import components
import { LinksListRow } from './links-list-row'

// Import styles
import './../styles/links-list.css'

// Create interfaces
interface LinkUI {
  id: number;
  author: string;
  code: string;
  url: string;
  clicks: number;
}

interface LinkListUI {
  links: LinkUI[];
  loading: boolean;
  handleLinkRemove: (id: number, code: string) => void;
}

// Create LinksList component
export const LinksList = (props: LinkListUI) => {
  // Show loading message
  if (props.loading) return <p>Links table is loading...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />

            <th className="table-head-item">Author</th>

            <th className="table-head-item">Code</th>

            <th className="table-head-item">Link</th>

            <th className="table-head-item" >Click Count</th>
            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.links.length > 0 ? (
            props.links.map((link: LinkUI, idx) => (
              <LinksListRow
                key={link.id}
                link={link}
                position={idx + 1}
                handleLinkRemove={props.handleLinkRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no links to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}