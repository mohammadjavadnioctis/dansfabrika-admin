import React from 'react'

const gridUpdateLinkStyle = { color: 'white', marginRight: 5, backgroundColor:'#2ecc71'}
const gridDeleteLinkStyle = { color: 'white', marginRight: 5, backgroundColor:'#ea484d'}

export const GridLinkUpdate = ({ onClick, title, href }) => <a style={gridUpdateLinkStyle} href={href} className='btn' onClick={onClick}>{title}</a>
export const GridLinkDelete = ({ onClick, title }) => <a style={gridDeleteLinkStyle} className='btn' onClick={onClick}>{title}</a>
