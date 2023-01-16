import { LogoSvg } from '@assets/default'
import { GlobalContext } from '@contexts/GlobalContext'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import styles from './styles.module.scss'

export function Header() {
  const { isAuthenticated, user } = useContext(GlobalContext)

  return (
    <header className={styles.app_header}>
      <div className={styles.app_header_content}>
        <div className={styles.app_header_content_logo}>
          <LogoSvg />
        </div>
        <nav className={styles.app_header_content_nav}>
          <ul className={styles.app_header_content_nav_ul}>
            <li>
              <Link href="/" legacyBehavior>
                Nossos Carros
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link href="/admin" legacyBehavior>
                  Administração
                </Link>
              </li>
            )}
            <li></li>
          </ul>
        </nav>
        {isAuthenticated ? (
          <div className={styles.app_header_content_profile}>
            <button>
              <strong>{user?.username}</strong>
              <Image
                src="https://github.com/Joaoalberto20.png"
                alt="Imagem do usuário"
                width={40}
                height={40}
              />
            </button>
          </div>
        ) : (
          <div className={styles.app_header_content_nav_login}>
            <Link href="/login" legacyBehavior>
              Fazer login
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
