import { Card } from '@components/Card'
import { SectionFilter } from '@components/SectionFilter'

import styles from './styles.module.scss'

export default function Admin() {
  return (
    <>
      <SectionFilter />
      <section>
        <div className={styles.app_layout_content}>
          <div className={styles.app_layout_content_cards}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </section>
    </>
  )
}
