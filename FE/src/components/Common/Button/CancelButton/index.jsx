import React from 'react'

import styles from '~/assets/css/button/cancelbutton.module.css'

const CancelButton = () => {
  return (
    <button className={styles.button} type="reset">
      Cancel
    </button>
  )
}

export default CancelButton
