
import React from 'react'
import { YAxis, YAxisProps } from 'recharts'

const CustomYAxis: React.FC<YAxisProps> = (props) => {
  const {
    // Add any other default props here
    ...rest
  } = props

  return <YAxis type={type} allowDecimals={allowDecimals} {...rest} />
}

export default CustomYAxis
