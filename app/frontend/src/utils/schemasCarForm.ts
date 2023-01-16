import * as yup from 'yup'

export const schemasFormaModalCar = yup.object({
  name: yup.string().required('O nome do carro é necessário!'),
  brand: yup.string().required('A marca do carro é necessário!'),
  model: yup.string().required('O model do carro é necessário!'),
  image_url: yup.string().required('É necessário inserir uma imagem do carro'),
  year: yup.number().required('É necessário inserir uma imagem do carro'),
  location: yup.string().required('A localização do carro é necessário!'),
  mileage: yup.number().required('A quilometragem do carro é necessário'),
  original_value: yup.string().required('O valor do carro é necessário'),
})

export type TypeFormModalCar = yup.InferType<typeof schemasFormaModalCar>
