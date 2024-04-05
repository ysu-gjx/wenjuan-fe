import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { increment, decrement } from '@/store/count'

const Index = () => {
  const state = useAppSelector((state) => state.count)
  const dispatch = useAppDispatch()
  return (
    <>
      <p>count: {state}</p>
      <button onClick={() => dispatch(increment(3))}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </>
  )
}

export default Index
