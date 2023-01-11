import { LogoSvg, UserSvg } from '@assets/default'
import Link from 'next/link'
import styles from './styles.module.scss'

export function Header() {
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
            <li>
              <Link href="/">Sobre Nós</Link>
            </li>
          </ul>
          <div className={styles.app_header_content_nav_login}>
            <Link href="/login">
              <UserSvg />
              <span>Fazer login</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
