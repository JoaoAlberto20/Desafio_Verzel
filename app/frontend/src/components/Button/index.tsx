import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean
  children: ReactNode
}

export function Button({ children, isLoading, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={styles.app_login_content_form_button}
      aria-pressed={isLoading}
    >
      <span>{children}</span>
    </button>
  )
}
