
import React from 'react'
import { XAxis, XAxisProps } from 'recharts'

const CustomXAxis: React.FC<XAxisProps> = (props) => {
  const {
    // Add any other default props here
    ...rest
  } = props

  return <XAxis type={type} allowDecimals={allowDecimals} {...rest} />
}

export default CustomXAxis
