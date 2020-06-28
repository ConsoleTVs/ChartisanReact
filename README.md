# @eternum/chartisan_react

> React adapter for any chartisan front-end on the web

[![NPM](https://img.shields.io/npm/v/@eternum/chartisan_react.svg)](https://www.npmjs.com/package/@eternum/chartisan_react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install @eternum/chartisan_react
```

## Usage

First create a Chart component and pass the Chartisan instance of your desired front-end library.

```tsx
import React, { FC } from 'react'
import { Chartisan, CC } from '@chartisan/echarts'
import { ChartisanChart, ChartProps } from '@eternum/chartisan_react'

export { useChartControls } from '@eternum/chartisan_react'
export type { CC }

export const Chart: FC<ChartProps<CC>> = (props) => {
  return <ChartisanChart chartisan={Chartisan} {...props} />
}
```

Then you can use the Chart as a component and give it the needed options. You can also use the
chart controls to create, update or destroy charts.

```tsx
import React from 'react'

import { Chart, useChartControls, CC } from './Chart'

const randomData = (values: number) => Array.from({ length: values }, () => Math.floor(Math.random() * 100))

const data = () => ({
  chart: { labels: ['First', 'Second', 'Third'] },
  datasets: [
    { name: 'Sample 1', values: randomData(3) },
    { name: 'Sample 2', values: randomData(3) },
  ],
})

const App = () => {
  const controls = useChartControls<CC>({ initOnDemand: true })
  return (
    <>
      <button onClick={() => controls?.create({ data: data() })}>Create Chart</button>
      <button onClick={() => controls?.update({ data: data(), background: true })}>Update Chart</button>
      <button onClick={() => controls?.destroy()}>Destroy Chart</button>
      <Chart height={500} controls={controls} />
    </>
  )
}

export default App
```

## License

MIT © [ConsoleTVs](https://github.com/ConsoleTVs)
