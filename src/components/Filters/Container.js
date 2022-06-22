import React from 'react'

import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import FilterInput from './Input'

const Container = ({ filters, onChange }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='filters-content'
        id='filters-content'
      >
        <Typography variant='subtitle1'>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FilterInput
          label=''
          values={filters}
          onChange={onChange}
        />
      </AccordionDetails>
    </Accordion>
  )
}

export default Container
