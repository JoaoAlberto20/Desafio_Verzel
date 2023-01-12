import { InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string | null
}

export function Input({ label, errorMessage = null, ...rest }: InputProps) {
  return (
    <div className={styles.app_login_content_form_inputs}>
      <div className={styles.app_login_content_form_control}>
        <input {...rest} />
        <label htmlFor="input-email-user" className={styles.control_label}>
          {label}
        </label>
      </div>
      {errorMessage && (
        <span className={styles.helper_text}>{errorMessage}</span>
      )}
    </div>
  )
}
