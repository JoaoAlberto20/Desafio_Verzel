import { GetServerSideProps } from 'next'

import { api } from '@services/api'

import { parseCookies } from 'nookies'

import { CarsDTO } from '@dtos/CarsDTO'

import { CardAmin } from '@components/Card/CardAmin'

import { MdAddCircle } from 'react-icons/md'

import styles from './styles.module.scss'

import { ModalFormCar } from '@components/ModalFormCar'
import * as Dialog from '@radix-ui/react-dialog'

interface AdminProps {
  cars: Array<CarsDTO>
}

export default function Admin({ cars }: AdminProps) {
  const orderCar = cars.sort((a, b) => {
    return Number(b.original_value) - Number(a.original_value)
  })
  return (
    <main>
      <section>
        <div className={styles.app_layout_content}>
          <div className={styles.app_layout_content_cards}>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className={styles.button_add_new_car}>
                  <MdAddCircle />
                </button>
              </Dialog.Trigger>
              <ModalFormCar />
            </Dialog.Root>
            {orderCar.length > 0 &&
              orderCar.map((car) => <CardAmin key={car.id} car={car} />)}
          </div>
        </div>
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'nextauth.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const { data } = await api.get<CarsDTO[]>('/carros')

  return {
    props: {
      cars: data,
    },
  }
}
