import React, { useState, useEffect } from 'react'

import { Chart, useChartControls, CC, UpdateOptions } from './Chart'

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
  const [update, setUpdate] = useState<UpdateOptions<CC>>({ data: data(), background: true })
  useEffect(() => {
    const handler = setInterval(() => {
      setUpdate({ data: data(), background: true })
    }, 2000)
    return () => clearInterval(handler)
  }, [])
  return (
    <>
      <div>
        <button onClick={() => controls?.create({ data: data() })}>Create Chart</button>
        <button onClick={() => controls?.update({ data: data(), background: true })}>Update Chart</button>
        <button onClick={() => controls?.destroy()}>Destroy Chart</button>
        {true && <Chart height={500} controls={controls} />}
      </div>
      <Chart height={500} options={{ data: data() }} updateOptions={update} />
    </>
  )
}

export default App
