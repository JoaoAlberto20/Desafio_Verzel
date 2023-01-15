import { GetStaticProps } from 'next'

import { Card } from '@components/Card'

import { api } from '@services/api'

import { CarsDTO } from '@dtos/CarsDTO'
import styles from './../styles/Home.module.scss'

interface HomeProps {
  cars: Array<CarsDTO>
}

export default function Home({ cars }: HomeProps) {
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

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<CarsDTO[]>('/carros')

  return {
    props: {
      cars: data,
    },
    revalidate: 60 * 60 * 1, // 1 Hour,
  }
}
