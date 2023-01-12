import { Card } from '@components/Card'
import { SectionFilter } from '@components/SectionFilter'
import { ICars } from '@interfaces/ICars'
import { api } from '@services/axios'
import { GetStaticProps } from 'next'

import styles from './styles.module.scss'

interface AdminProps {
  cars: ICars[]
}
export default function Admin({ cars }: AdminProps) {
  return (
    <>
      <SectionFilter />
      <section>
        <div className={styles.app_layout_content}>
          <div className={styles.app_layout_content_cards}>
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
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<ICars[]>('/carros')

  return {
    props: {
      cars: data,
    },
    revalidate: 60 * 60 * 1, // 1 Hour,
  }
}
