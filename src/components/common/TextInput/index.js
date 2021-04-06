import TextFiled from '../TextFiled'

export default function TextInput(props) {
  const { label } = props

  return (
    <div>
      <div><b>{label}</b></div>
      <div>
        <TextFiled {...props} />
      </div>
    </div>
  )
}