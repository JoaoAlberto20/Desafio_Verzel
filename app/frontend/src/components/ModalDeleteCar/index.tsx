import * as AlertDialog from '@radix-ui/react-dialog'
import { api } from '@services/api'

import styles from './styles.module.scss'

interface ModalDeleteCarProps {
  idCar: string
}

export function ModalDeleteCar({ idCar }: ModalDeleteCarProps) {
  const handleDeleteCar = async () => {
    try {
      await api.delete(`carros/${idCar}`)
      alert('Carro deletado com sucesso!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className={styles.app_modal_delete_car_overlay} />
      <AlertDialog.Content className={styles.app_modal_delete_car_content}>
        <AlertDialog.Title
          className={styles.app_modal_delete_car_content_title}
        >
          Are you absolutely sure?
        </AlertDialog.Title>
        <AlertDialog.Description
          className={styles.app_modal_delete_car_content_description}
        >
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialog.Description>
        <div className={styles.app_modal_delete_car_content_button}>
          <AlertDialog.Close asChild>
            <button className={styles.button_cancel}>Cancel</button>
          </AlertDialog.Close>
          <button
            type="button"
            className={styles.button_delete}
            onClick={handleDeleteCar}
          >
            Yes, delete account
          </button>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  )
}
