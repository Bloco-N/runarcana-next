import { useRouter } from "next/router"
import styled from "styled-components"

const Container = styled.div`
  
`

export default function CharacterDashBoard(){
  const router = useRouter()
  const { id } = router.query
  return (
    <Container>
      {id}
    </Container>
  )
}