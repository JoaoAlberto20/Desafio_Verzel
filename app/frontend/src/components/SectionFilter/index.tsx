import { FilterSvg, SearchSvg } from '@assets/default'
import { Input } from '@components/Input'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import styles from './styles.module.scss'

export function SectionFilter() {
  const [isScrolling, setIsScrolling] = useState(false)
  const { pathname } = useRouter()

  const title = pathname === '/' ? 'Carros Usados' : 'Administração'

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsScrolling(window.scrollY > 20)
    })
  }, [])

  return (
    <section
      className={styles.app_section_filters}
      aria-controls={`${isScrolling}`}
    >
      <div className={styles.app_section_filter_content_search}>
        <div className={styles.app_section_filter_content_search_form}>
          <form>
            <div className={styles.app_section_filter_input_content}>
              <Input placeholder="Busque por marca, modelo, ano, cor" />
              <button type="submit">
                <SearchSvg />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.app_section_filter_content_bottom}>
        <div className={styles.app_section_filter_content_title}>
          <strong>{title}</strong>
        </div>
        <div className={styles.app_section_filter_controller}>
          <div className={styles.app_section_filter_controller_buttons}>
            <button className={styles.show_filter}>
              <FilterSvg /> Mostrar Filtros
            </button>
            <button className={styles.remove_filter}>Remover filtros</button>
          </div>
          <div className={styles.app_section_filter_controller_result_select}>
            <span>2.944 resultados</span>
            <h2>Olea</h2>
          </div>
        </div>
      </div>
    </section>
  )
}
