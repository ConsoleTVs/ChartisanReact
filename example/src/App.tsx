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
