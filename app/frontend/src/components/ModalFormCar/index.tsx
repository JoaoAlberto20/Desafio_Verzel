import { Button } from '@components/Button'
import * as Dialog from '@radix-ui/react-dialog'

import { Input } from '../Input'

import styles from './styles.module.scss'

import { CarsDTO } from '@dtos/CarsDTO'
import { MdClose } from 'react-icons/md'

import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

const schemasFormaModalCar = yup.object({
  name: yup.string().required('O nome do carro é necessário!'),
  brand: yup.string().required('A marca do carro é necessário!'),
  model: yup.string().required('O model do carro é necessário!'),
  image_url: yup.string().required('É necessário inserir uma imagem do carro'),
  year: yup.number().required('É necessário inserir uma imagem do carro'),
  location: yup.string().required('A localização do carro é necessário!'),
  mileage: yup.number().required('A quilometragem do carro é necessário'),
  original_value: yup.string().required('O valor do carro é necessário'),
})

type TypeFormModalCar = yup.InferType<typeof schemasFormaModalCar>

interface ModalFormCarProps {
  isEdit?: boolean
  carEdit?: CarsDTO
}

export function ModalFormCar({ isEdit, carEdit }: ModalFormCarProps) {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<TypeFormModalCar>({
    resolver: yupResolver(schemasFormaModalCar),
    defaultValues: {
      name: carEdit?.name || '',
      brand: carEdit?.brand || '',
      model: carEdit?.model || '',
      image_url: carEdit?.image_url || '',
      year: carEdit?.year || 0,
      location: carEdit?.location || '',
      mileage: carEdit?.mileage || 0,
      original_value: carEdit?.original_value || '',
    },
  })

  const submitNewCar = async (data: TypeFormModalCar) => {
    try {
      await api.post('/carros', data)
      alert('Carro cadastrado com sucesso!')
      reset()
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'
      alert(title)
    }
  }

  const updateNewCar = async (data: TypeFormModalCar) => {
    try {
      await api.patch(`carros/${carEdit?.id}`, data)
      alert('Atualização feita com sucesso!')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde.'
      alert(title)
    }
  }

  const handleSubmitNewCarOrEditCar = async (data: TypeFormModalCar) => {
    if (isEdit) {
      await updateNewCar(data)
    } else {
      await submitNewCar(data)
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={styles.app_modal_form_car_overlay} />
      <Dialog.Content className={styles.app_modal_form_car_content}>
        <Dialog.Close
          className={styles.app_modal_form_car_content_button_close}
        >
          <MdClose />
        </Dialog.Close>
        <Dialog.Title>
          {isEdit ? 'Editar o carro' : 'Cadastrar um novo carro'}
        </Dialog.Title>
        <form action="" onSubmit={handleSubmit(handleSubmitNewCarOrEditCar)}>
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
                placeholder="Tesla"
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
                placeholder="Tesla"
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
                placeholder="Tesla"
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
                placeholder="Tesla"
                name={name}
                onChange={onChange}
                value={value}
                errorMessage={errors.original_value?.message}
              />
            )}
          />
          <Button isLoading={false} disabled={!isValid}>
            <span>{isEdit ? 'Editar' : 'Cadastrar'}</span>
          </Button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
