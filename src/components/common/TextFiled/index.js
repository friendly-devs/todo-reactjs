import React from 'react'
import './index.css'

export default function TextFiled(props) {
  const { name, value, type = 'text', onChange } = props

  return (
    <input
      className={'input-component'}
      name={name}
      value={value}
      type={type}
      onChange={onChange} />
  )
}