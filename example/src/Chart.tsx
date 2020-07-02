import React, { FC } from 'react'
import { Chartisan, CC } from '@chartisan/echarts'
import { ChartisanChart, ChartProps } from '@eternum/chartisan_react'

export { useChartControls } from '@eternum/chartisan_react'
export type { UpdateOptions } from '@chartisan/chartisan'
export type { CC }

export const Chart: FC<ChartProps<CC>> = (props) => {
  return <ChartisanChart chartisan={Chartisan} {...props} />
}
