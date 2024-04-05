import { useAppSelector } from '@/store/hooks'

export default function useGetUserInfo() {
  const { username, nickname } = useAppSelector((state) => state.user)

  return { username, nickname }
}
