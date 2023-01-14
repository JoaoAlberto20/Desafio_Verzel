import { GetStaticProps } from 'next'

import { Card } from '@components/Card'
import { SectionFilter } from '@components/SectionFilter'

import { getAPIClient } from '@services/axios'

import { CarsDTO } from '@dtos/CarsDTO'
import styles from './../styles/Home.module.scss'

interface HomeProps {
  cars: Array<CarsDTO>
}

export default function Home({ cars }: HomeProps) {
  return (
    <>
      <SectionFilter />
      <main>
        <section>
          <div className={styles.app_layout_home_content}>
            <div className={styles.app_layout_home_content_cards}>
              {cars.map((car) => (
                <Card
                  key={car.id}
                  title={car.name}
                  location={car.location}
                  price={car.original_value}
                  mileage={car.mileage}
                  year={car.year}
                  imageUrl={car.image_url}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apiCLient = getAPIClient()
  const { data } = await apiCLient.get<CarsDTO[]>('/carros')

  return {
    props: {
      cars: data,
    },
    revalidate: 60 * 60 * 1, // 1 Hour,
  }
}
