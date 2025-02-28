// url/src/components/links-list.tsx

// Import deps
import React from 'react'

// Import components
import { LinksListRow } from './links-list-row.tsx'

// Import styles
import './../styles/links-list.css'

// Create LinksList component
export const LinksListSkeleton = () => {
    // Show loading message

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

            </tbody>
        </table>
    )
}