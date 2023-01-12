import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import styles from './styles.module.scss'

const loginFormSchemas = yup.object({
  username: yup.string().required('Informe o seu nome de usuário.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(8, 'A senha deve ter pelo menos 8 digito.'),
})

type TypesLoginFormData = yup.InferType<typeof loginFormSchemas> & {}

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<TypesLoginFormData>({
    resolver: yupResolver(loginFormSchemas),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleLoginUser = async (data: TypesLoginFormData) => {
    console.log(data)
  }

  return (
    <div className={styles.app_login}>
      <div className={styles.app_login_banner} />
      <div className={styles.app_login_content}>
        <form
          className={styles.app_login_content_form}
          onSubmit={handleSubmit(handleLoginUser)}
        >
          <strong>Painel administrativo</strong>
          <Controller
            control={control}
            name="username"
            render={({ field: { name, onChange, value } }) => (
              <Input
                type="text"
                label="Username"
                name={name}
                onChange={onChange}
                value={value}
                placeholder="joaoalberto"
                errorMessage={errors.username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { name, onChange, value } }) => (
              <Input
                type="password"
                label="Password"
                placeholder="@joao?lberto@"
                name={name}
                onChange={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <div className={styles.app_login_content_form_forgot_password}>
            <a href="#">Esqueceu a senha?</a>
          </div>
          <Button type="submit" disabled={!isValid}>
            Iniciar sessão
          </Button>
        </form>
      </div>
    </div>
  )
}
