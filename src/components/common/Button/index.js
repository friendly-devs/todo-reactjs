import React from 'react'
import './index.css'

export default function Button(props) {
  const { children, onClick, variant = 'primary' } = props
  return (
    <button
      className={`button-component ${variant}`}
      onClick={onClick}>
      {children}
    </button>
  )
}