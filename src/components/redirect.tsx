import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import axios from 'axios'

export const Redirect = () => {
    const { code } = useParams()
    const mainUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchAndRedirect = async () => {
            try {
                const response = await axios.get(`${mainUrl}/redirect/${code}`, {
                    headers: {
                        "Authorization" : `Bearer`
                    }
                })
                if (response.data.url) {
                    console.log(response.data.url);
                    window.location.replace(response.data.url);
                }
            } catch (err) {
                console.error('Error fetching redirect URL:', err)
            }
        }

        if (code) {
            fetchAndRedirect()
        }
    }, [code])

    return (
        <></>
    )
}
