import { Layout } from 'antd'
import styled from 'styled-components'

const { 
  Header: AntHeader,
  Content: AntContent
} = Layout

const Header = styled(AntHeader)`
  background-color: white
`

const Content = styled(AntContent)`
  padding: 10px 50px
`

export { Header, Content }
