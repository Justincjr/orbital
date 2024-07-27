import React from 'react'
import { getServerData } from '../helper/helper'
import { useEffect, useState } from 'react'

export default function ResultTable() {
    const [data, setData] = useState([])
    useEffect(() => {
        getServerData(`http://${process.env.REACT_APP_URL}:8080/api/result`, (res) => { //`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`
            setData(res)
        })
    })
    return (
        <div>
            <table>
                <thead className='table-header'>
                    <tr className='table-row'>
                        <td>Name</td>
                        <td>Attempted</td>
                        <td>High Score</td>
                        <td>Result</td>
                    </tr>
                </thead>
                <tbody>
                    { !data ?? <div>No Data Found </div>}
                    {
                        data.map((v, i) => (
                            <tr className='table-body' key={i}>
                                <td>{v?.username || ''}</td>
                                <td>{v?.attempts || 0}</td>
                                <td>{v?.points || 0}</td>
                                <td>{v?.achieved || ""}</td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
      )
    }