import { Card } from '@components/Card'

import { api } from '@services/api'

import { CarsDTO } from '@dtos/CarsDTO'
import { useEffect, useState } from 'react'
import styles from '../styles/pages/Home.module.scss'

export default function Home() {
  const [cars, setCars] = useState<CarsDTO[]>([])
  useEffect(() => {
    const getFetchCars = async () => {
      try {
        const { data } = await api.get<CarsDTO[]>('/carros')
        setCars(data)
      } catch (error) {
        console.log(error)
      }
    }
    getFetchCars()
  }, [])

  const orderCar = cars.sort((a, b) => {
    return Number(b.original_value) - Number(a.original_value)
  })

  return (
    <main>
      <section>
        <div className={styles.app_layout_home_content}>
          <div className={styles.app_layout_home_content_cards}>
            {orderCar.map((car) => (
              <Card key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
