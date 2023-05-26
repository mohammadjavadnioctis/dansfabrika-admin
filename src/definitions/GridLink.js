import React from 'react'

const gridUpdateLinkStyle = { color: 'white', marginRight: 5, backgroundColor:'#2ecc71'}
const gridDeleteLinkStyle = { color: 'white', marginRight: 5, backgroundColor:'#ea484d', width:'75px'}

export const GridLinkUpdate = ({ onClick, title, href }) => <a style={gridUpdateLinkStyle} href={href} className='btn' onClick={onClick}>{title}</a>
export const GridLinkDelete = ({ onClick, title }) => <a style={gridDeleteLinkStyle} className='btn' onClick={onClick}>{title}</a>


export const gridStyle = { minHeight: 550, minWidth: 400, marginTop: 10 }

export const ImageFormatter = ({ src }) => <img src={'https://api.dansfabrika.com/images/'+src} width={40} height={40} alt="Image" /> 