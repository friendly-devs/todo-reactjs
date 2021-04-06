import React from 'react'
import './index.css'

export default function Selection(props) {
  const {options, value, onChange} = props
  
  const optionElements = options.map((option) => <option key={option} value={option}>{option}</option>)
  
  return (
    <select 
    className={'select-component'}
    value={value} 
    onChange={onChange}>
      {optionElements}
    </select>
  )
}