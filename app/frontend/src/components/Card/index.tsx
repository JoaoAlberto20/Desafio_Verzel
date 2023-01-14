import { formatCurrency } from '@utils/formatCurrency'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FaTrash } from 'react-icons/fa'

import styles from './styles.module.scss'

export interface CardProps {
  title: string
  year: number
  mileage: number
  price: string
  location: string
  imageUrl: string
}

export function Card({
  title,
  year,
  mileage,
  price,
  imageUrl,
  location,
}: CardProps) {
  const { pathname } = useRouter()

  const handleDeleteCars = () => {
    console.log('test')
  }

  const handleEditCars = () => {
    console.log('test')
  }

  return (
    <Link href="/" className={styles.app_card_car}>
      <div className={styles.app_card_car_content}>
        <Image
          src={imageUrl}
          alt={title}
          width={275}
          height={158}
          priority
          quality={100}
        />
        <div className={styles.app_card_car_content_info}>
          <strong>{title}</strong>
          <p>{`${year} • ${mileage} Km • ${location}`}</p>
          <div className={styles.app_card_car_content_info_price}>
            <span>{formatCurrency.format(Number(price))}</span>
            {pathname === '/admin' && (
              <div>
                <button
                  type="button"
                  className={styles.button_edit}
                  title="Remover veículo"
                  onClick={handleEditCars}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className={styles.button_remove}
                  title="Remover veículo"
                  onClick={handleDeleteCars}
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
