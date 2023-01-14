import { parseCookies } from 'nookies'

import { CarsDTO } from '@dtos/CarsDTO'

import { CardAmin } from '@components/Card/CardAmin'
import { SectionFilter } from '@components/SectionFilter'

import { getAPIClient } from '@services/axios'
import { GetServerSideProps } from 'next'
import styles from './styles.module.scss'

interface AdminProps {
  cars: Array<CarsDTO>
}

export default function Admin({ cars }: AdminProps) {
  return (
    <>
      <SectionFilter />
      <main>
        <section>
          <div className={styles.app_layout_content}>
            <div className={styles.app_layout_content_cards}>
              {cars.map((car) => (
                <CardAmin
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiCLient = getAPIClient(ctx)
  const { 'nextauth.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const { data } = await apiCLient.get<CarsDTO[]>('/carros')

  return {
    props: {
      cars: data,
    },
  }
}
