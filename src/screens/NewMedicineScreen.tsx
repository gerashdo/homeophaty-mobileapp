import React from 'react'
import { NewMedicineForm } from '../components/medicine/NewMedicineForm'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'

export const NewMedicineScreen = () => {

  return (
    <ScreenTemplate
      style={{
        ...appStyles.globalMargin
      }}
    >
      <NewMedicineForm />
    </ScreenTemplate>
  )
}
