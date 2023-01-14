import { LogoSvg, UserSvg } from '@assets/default'
import { GlobalContext } from '@contexts/GlobalContext'
import Link from 'next/link'
import { useContext } from 'react'
import styles from './styles.module.scss'

export function Header() {
  const { isAuthenticated } = useContext(GlobalContext)

  console.log(isAuthenticated)
  return (
    <header className={styles.app_header}>
      <div className={styles.app_header_content}>
        <div className={styles.app_header_content_logo}>
          <LogoSvg />
        </div>
        <nav className={styles.app_header_content_nav}>
          <ul className={styles.app_header_content_nav_ul}>
            <li>
              <Link href="/">Nossos Carros</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link href="/admin">Administração</Link>
              </li>
            )}
            <li></li>
          </ul>
        </nav>
        <div className={styles.app_header_content_nav_login}>
          <Link href="/login">
            <UserSvg />
            <span>Fazer login</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
