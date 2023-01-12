import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FaTrash } from 'react-icons/fa'

import styles from './styles.module.scss'

interface CardProps {
  title: string
  year: string
  mileage: string
  price: string
}

export function Card({ title, year, mileage, price }: CardProps) {
  const { pathname } = useRouter()

  return (
    <Link href="/" className={styles.app_card_car}>
      <div className={styles.app_card_car_content}>
        <Image
          src="https://images.kavak.services/images/181969/EXTERIOR-frontSidePilotNear-1649852905965.jpeg?d=540x310"
          alt=""
          width={275}
          height={158}
          priority
          quality={100}
        />
        <div className={styles.app_card_car_content_info}>
          <strong>Nissan Sentra SV</strong>
          <p>2016 • 110.186 km • Automático</p>
          <div className={styles.app_card_car_content_info_price}>
            <span>R$ 52.899</span>
            {pathname === '/admin' && (
              <div>
                <button
                  type="button"
                  className={styles.button_edit}
                  title="Remover veículo"
                >
                  Editar
                </button>
                <button
                  type="button"
                  className={styles.button_remove}
                  title="Remover veículo"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
