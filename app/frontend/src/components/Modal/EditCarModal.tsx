import { Button } from '@components/Button'
import * as Dialog from '@radix-ui/react-dialog'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { CarsDTO } from '@dtos/CarsDTO'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'

import { schemasFormaModalCar, TypeFormModalCar } from '@utils/schemasCarForm'

import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { Input } from '../Input'
import styles from './styles.module.scss'

interface EditCarModalProps {
  carEdit: CarsDTO
}

export function EditCarModal({ carEdit }: EditCarModalProps) {
  const [open, setOpen] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<TypeFormModalCar>({
    resolver: yupResolver(schemasFormaModalCar),
    defaultValues: {
      name: carEdit?.name,
      brand: carEdit?.brand,
      model: carEdit?.model,
      image_url: carEdit?.image_url,
      year: carEdit?.year,
      location: carEdit?.location,
      mileage: carEdit?.mileage,
      original_value: carEdit?.original_value,
    },
  })

  const handleEditCar = async (data: TypeFormModalCar) => {
    try {
      await api.patch(`carros/${carEdit?.id}`, data)
      alert('Atualização feita com sucesso!')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'
      alert(title)
    } finally {
      setOpen(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={styles.button_edit}
          title="Remover veículo"
        >
          Editar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.app_modal_form_car_overlay} />
        <Dialog.Content className={styles.app_modal_form_car_content}>
          <Dialog.Close
            className={styles.app_modal_form_car_content_button_close}
          >
            <MdClose />
          </Dialog.Close>
          <Dialog.Title>Editar o carro</Dialog.Title>
          <form action="" onSubmit={handleSubmit(handleEditCar)}>
            <Controller
              control={control}
              name="name"
              render={({ field: { name, value, onChange } }) => (
                <Input
                  placeholder="Model X Branco"
                  label="Nome"
                  name={name}
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="brand"
              render={({ field: { name, value, onChange } }) => (
                <Input
                  type="text"
                  label="Marca"
                  placeholder="Tesla"
                  name={name}
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.brand?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="model"
              render={({ field: { name, value, onChange } }) => (
                <Input
                  type="text"
                  label="Modelo"
                  placeholder="Tesla"
                  name={name}
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.model?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="image_url"
              render={({ field: { name, value, onChange } }) => (
                <Input
                  type="text"
                  label="Image"
                  placeholder="Tesla"
                  name={name}
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.image_url?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="year"
              render={({ field: { name, value, onChange } }) => (
                <Input
                  type="number"
                  label="Ano"
                  placeholder="2023"
                  name={name}
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.year?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="location"
              render={({ field: { name, value, onChange } }) => (
                <Input
                  type="text"
                  label="Localização"
                  placeholder="São paulo"
                  name={name}
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.location?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="mileage"
              render={({ field: { name, value, onChange } }) => (
                <Input
                  type="number"
                  label="Quilometragem"
                  placeholder="1000km"
                  name={name}
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.mileage?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="original_value"
              render={({ field: { name, value, onChange } }) => (
                <Input
                  type="text"
                  label="Valor original"
                  placeholder="50000.00"
                  name={name}
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.original_value?.message}
                />
              )}
            />
            <Button isLoading={false} disabled={!isValid}>
              <span>Editar</span>
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
