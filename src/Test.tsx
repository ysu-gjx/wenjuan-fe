import { Space } from 'antd'
import { ChangeEvent, useState } from 'react'
const Index = () => {
  const [selectedCity, setSelectedCities] = useState<string[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // remove
    if (selectedCity.includes(e.target.value)) {
      setSelectedCities(selectedCity.filter((item) => item !== e.target.value))
    } else {
      setSelectedCities([...selectedCity, e.target.value])
    }
  }
  return (
    <>
      <Space>
        <label htmlFor="beijing">北京</label>
        <input
          id="beijing"
          type="checkbox"
          value="beijing"
          checked={selectedCity.includes('beijing')}
          onChange={handleChange}
        />
        <label htmlFor="shanghai">上海</label>
        <input
          id="shanghai"
          type="checkbox"
          value="shanghai"
          checked={selectedCity.includes('shanghai')}
          onChange={handleChange}
        />
        <label htmlFor="shenzhen">深圳</label>
        <input
          id="shenzhen"
          type="checkbox"
          value="shenzhen"
          checked={selectedCity.includes('shenzhen')}
          onChange={handleChange}
        />
      </Space>
      <div>{JSON.stringify(selectedCity)}</div>
    </>
  )
}

export default Index
