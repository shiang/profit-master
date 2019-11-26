import gql from 'graphql-tag'

const GET_COUNTRIES = gql`
  query Countries {
  countries {
    name
    code
    currency
    emoji
  }
}
`
