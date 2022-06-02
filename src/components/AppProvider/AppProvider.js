/* global localStorage */
import React, { createContext, useState } from 'react'

export const AppContext = createContext(null)

const parseLocalItem = (key, defaultVal) => {
  try {
    const data = localStorage.getItem(key) || '[]'
    return JSON.parse(data)
  } catch (err) {
    return defaultVal
  }
}

const storageKeys = {
  transaction: 'transaction-data',
  budget: 'budget-data',
  filters: 'filters-data',
  transforms: 'transforms-data'
}

const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState()
  const [transactions, setTransactions] = useState(parseLocalItem(storageKeys.transaction, []))
  const [budget, setBudget] = useState(parseLocalItem(storageKeys.budget, {}))
  const [filters, setFilters] = useState(parseLocalItem(storageKeys.filters, {}))
  const [transforms, setTransforms] = useState(parseLocalItem(storageKeys.transforms, {}))

  const handleTransactions = data => {
    setTransactions(data)
    localStorage.setItem(storageKeys.transaction, JSON.stringify(data))
  }

  const handleBudget = data => {
    setBudget(data)
    localStorage.setItem(storageKeys.budget, JSON.stringify(data))
  }

  const handleFilters = data => {
    setFilters(data)
    localStorage.setItem(storageKeys.filters, JSON.stringify(data))
  }

  const handleTransforms = data => {
    setTransforms(data)
    localStorage.setItem(storageKeys.transforms, JSON.stringify(data))
  }

  return (
    <AppContext.Provider value={{
      settings,
      setSettings,
      transactions,
      setTransactions: handleTransactions,
      budget,
      setBudget: handleBudget,
      filters,
      setFilters: handleFilters,
      transforms,
      setTransforms: handleTransforms
    }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
