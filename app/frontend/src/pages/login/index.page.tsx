import { useContext } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { GlobalContext } from '@contexts/GlobalContext'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import styles from './styles.module.scss'

const loginFormSchemas = yup.object({
  email: yup
    .string()
    .email('Digite um email valido')
    .required('Informe o seu nome de usuário.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(3, 'A senha deve ter pelo menos 8 digito.'),
})

type TypesLoginFormData = yup.InferType<typeof loginFormSchemas> & {}

export default function Login() {
  const { signIn } = useContext(GlobalContext)

  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<TypesLoginFormData>({
    resolver: yupResolver(loginFormSchemas),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLoginUser = async ({ email, password }: TypesLoginFormData) => {
    await signIn({ email, password })
  }

  return (
    <>
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
              name="email"
              render={({ field: { name, onChange, value } }) => (
                <Input
                  type="text"
                  label="E-mail"
                  name={name}
                  onChange={onChange}
                  value={value}
                  placeholder="admin@app.com"
                  errorMessage={errors.email?.message}
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
                  placeholder="admin"
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
    </>
  )
}
