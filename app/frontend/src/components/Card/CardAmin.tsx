import Image from 'next/image'

import { formatCurrency } from '@utils/formatCurrency'

import { CardProps } from '.'

import { EditCarModal } from '@components/Modal/EditCarModal'
import { ModalDeleteCar } from '@components/ModalDeleteCar'
import styles from './styles.module.scss'

export function CardAmin({ car }: CardProps) {
  return (
    <div className={styles.app_card_car}>
      <div className={styles.app_card_car_content}>
        <Image
          src={car.image_url}
          alt={car.name}
          width={275}
          height={158}
          priority
          quality={100}
        />
        <div className={styles.app_card_car_content_info}>
          <strong>{car.name}</strong>
          <p>{`${car.year} • ${car.mileage} Km • ${car.location}`}</p>
          <div className={styles.app_card_car_content_info_price}>
            <span>{formatCurrency.format(Number(car.original_value))}</span>
            <div>
              <EditCarModal carEdit={car} />
              <ModalDeleteCar idCar={car.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
