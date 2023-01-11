import styles from './styles.module.scss'

export default function Login() {
  return (
    <div className={styles.app_login}>
      <div className={styles.app_login_banner} />
      <div className={styles.app_login_content}>
        <form action="" className={styles.app_login_content_form}>
          <strong>Faça login na sua conta</strong>
          <div className={styles.app_login_content_form_inputs}>
            <label htmlFor="input-email-user" className={styles.label}>
              E-mail
            </label>
            <input type="text" placeholder="" />
          </div>
          <div className={styles.app_login_content_form_inputs}>
            <label htmlFor="input-email-user" className={styles.label}>
              Senha
            </label>
            <input type="text" placeholder="" />
          </div>
          <div className={styles.app_login_content_form_forgot_password}>
            <a href="#">Esqueceu a senha?</a>
          </div>
          <button className={styles.app_login_content_form_button} disabled>
            Iniciar sessão
          </button>
        </form>
      </div>
    </div>
  )
}
