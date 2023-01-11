import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import styles from './styles.module.scss'

const loginFormSchemas = yup.object({
  email: yup.string().email('E-mail invalido.').required('Informe o email.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 números.'),
})

type TypesLoginFormData = yup.InferType<typeof loginFormSchemas> & {}

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<TypesLoginFormData>({
    resolver: yupResolver(loginFormSchemas),
    defaultValues: {
      email: '',
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
          <div className={styles.app_login_content_form_inputs}>
            <label htmlFor="input-email-user" className={styles.label}>
              E-mail
            </label>
            <Controller
              control={control}
              name="email"
              render={({ field: { name, onChange, value } }) => (
                <input
                  type="text"
                  name={name}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div className={styles.app_login_content_form_inputs}>
            <label htmlFor="input-email-user" className={styles.label}>
              Senha
            </label>
            <Controller
              control={control}
              name="password"
              render={({ field: { name, onChange, value } }) => (
                <input
                  type="password"
                  name={name}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div className={styles.app_login_content_form_forgot_password}>
            <a href="#">Esqueceu a senha?</a>
          </div>
          <button
            type="submit"
            className={styles.app_login_content_form_button}
            disabled={!isValid}
          >
            Iniciar sessão
          </button>
        </form>
      </div>
    </div>
  )
}
