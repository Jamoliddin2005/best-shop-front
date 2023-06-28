import React from 'react'
import "./Loading2.css"

function Loading2({ style }) {
    return (
        <div className="loading2" >
            <h5 style={style}>Loading<span>.</span><span>.</span><span>.</span></h5>
        </div>
    )
}

export default Loading2