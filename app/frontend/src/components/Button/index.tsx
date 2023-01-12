import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button {...rest} className={styles.app_login_content_form_button}>
      {children}
    </button>
  )
}
