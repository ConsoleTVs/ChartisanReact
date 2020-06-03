import React, { FC } from 'react'
import { Chartisan, CC } from '@chartisan/echarts'
import { ChartisanChart, ChartProps } from '@chartisan/react'

export { useChartControls } from '@chartisan/react'
export type { CC }

export const Chart: FC<ChartProps<CC>> = (props) => {
  return <ChartisanChart chartisan={Chartisan} {...props} />
}
