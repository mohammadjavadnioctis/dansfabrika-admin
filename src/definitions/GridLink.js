import React from 'react'
import { IMAGE_URL } from 'src/config/Config'
import { SetDateFormat, SetDateTimeFormat } from './DateFormat/GetDateFormat'

const gridUpdateLinkStyle = { color: 'white', marginRight: 5, backgroundColor:'#2ecc71'}
const gridDeleteLinkStyle = { color: 'white', marginRight: 5, backgroundColor:'#ea484d', width:'75px'}
const gridPaswordUpdateLinkStyle = { color: 'white', marginRight: 5, backgroundColor:'blue'}

export const GridLinkUpdate = ({ onClick, title, href }) => <a style={gridUpdateLinkStyle} href={href} className='btn' onClick={onClick}>{title}</a>
export const GridLinkDelete = ({ onClick, title }) => <a style={gridDeleteLinkStyle} className='btn' onClick={onClick}>{title}</a>
export const GridLinkPasswordUpdate = ({ onClick, title }) => <a style={gridPaswordUpdateLinkStyle} className='btn' onClick={onClick}>{title}</a>

export const gridStyle = { minHeight: 550, minWidth: 400, marginTop: 10 }

// export const ImageFormatter = ({ src, width, height }) => <img src={IMAGE_URL + src} width={width} height={height} alt="Image" />

export const ImageFormatter = ({ src }) => <img src={IMAGE_URL + src} width={40} height={40} alt="Image" />

export const ImageFormatterGeneral = ({ src }) => <img src={IMAGE_URL + src} width={150} height={150} alt="Image" />

export const DateFormat = ({ date }) => <div>{SetDateFormat(date)}</div>

