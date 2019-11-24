import React, { useReducer } from 'react'

interface CalculatorState {
  gst: string
  margin: string
  disty: string
  rebate: string
  fobPrice: string
  forexRate: string
  freight: string
  rrp: string
  landedCost: string
}

type Action =
  | { type: 'STEP_1', payload: { rrp: string, gst: string } }
  | { type: 'STEP_2', payload: { margin: string, disty: string, rebate: string } }
  | { type: 'FINAL_STEP', payload: { fobPrice: string, forexRate: string, freight: string, landedCost: string } }
  | { type: 'RESET' }


interface Props {
  children?: React.ReactNode
}

const initialState: CalculatorState = {
  gst: '',
  margin: '',
  disty: '',
  rebate: '',
  fobPrice: '',
  forexRate: '',
  freight: '',
  rrp: '',
  landedCost: ''
}

const reducer = (state: CalculatorState, action: Action) => {
  switch (action.type) {
    case 'STEP_1':
      return {
        ...state,
        rrp: action.payload.rrp,
        gst: action.payload.gst
      }
    case 'STEP_2':
      return {
        ...state,
        margin: action.payload.margin,
        disty: action.payload.disty,
        rebate: action.payload.rebate
      }
    case 'FINAL_STEP':
      return {
        ...state,
        fobPrice: action.payload.fobPrice,
        forexRate: action.payload.forexRate,
        freight: action.payload.freight,
        landedCost: action.payload.landedCost
      }
    case 'RESET':
      return initialState
    default:
      return
  }
}

export const CalculatorContext = React.createContext<{
  state: typeof initialState,
  dispatch: (action: Action) => void
}>({
  state: initialState,
  dispatch: () => {}
})

const CalculatorProvider: React.FC<Props> = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  )
}

export default CalculatorProvider
