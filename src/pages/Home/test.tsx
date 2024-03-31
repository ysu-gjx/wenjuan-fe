import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '@/store/count'

type StateType = { count: number }
type ActionType = { type: 'increment' | 'decrement' }

const Index = () => {
  const state = useSelector((state: StateType) => state.count)
  const dispatch = useDispatch()
  return (
    <>
      <p>count: {state}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </>
  )
}

export default Index
