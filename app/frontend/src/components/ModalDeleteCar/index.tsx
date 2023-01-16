import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { api } from '@services/api'
import { FaTrash } from 'react-icons/fa'

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
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          type="button"
          className={styles.button_remove}
          title="Remover veículo"
        >
          <FaTrash />
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.app_modal_delete_car_overlay} />
        <AlertDialog.Content className={styles.app_modal_delete_car_content}>
          <AlertDialog.Title
            className={styles.app_modal_delete_car_content_title}
          >
            Você tem certeza absoluta que você quer deletar?
          </AlertDialog.Title>
          <AlertDialog.Description
            className={styles.app_modal_delete_car_content_description}
          >
            Essa ação não pode ser desfeita. Isso excluirá permanentemente esse
            dados de nossos servidores.
          </AlertDialog.Description>
          <div className={styles.app_modal_delete_car_content_button}>
            <AlertDialog.Cancel asChild>
              <button className={styles.button_cancel}>Cancelar</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                type="button"
                className={styles.button_delete}
                onClick={handleDeleteCar}
              >
                Sim, deletar dados
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
