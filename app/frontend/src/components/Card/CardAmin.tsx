import Image from 'next/image'

import { formatCurrency } from '@utils/formatCurrency'

import * as Dialog from '@radix-ui/react-dialog'

import { FaTrash } from 'react-icons/fa'

import { CardProps } from '.'

import { ModalDeleteCar } from '@components/ModalDeleteCar'
import { ModalFormCar } from '@components/ModalFormCar'
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
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    className={styles.button_edit}
                    title="Remover veículo"
                  >
                    Editar
                  </button>
                </Dialog.Trigger>
                <ModalFormCar isEdit carEdit={car} />
              </Dialog.Root>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    className={styles.button_remove}
                    title="Remover veículo"
                  >
                    <FaTrash />
                  </button>
                </Dialog.Trigger>
                <ModalDeleteCar idCar={car.id} />
              </Dialog.Root>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
