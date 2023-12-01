import { graphql } from "../../gql";

export const COUNTRIES = graphql (`
  query Query ($regexCode: String!) {
    countries (filter: {code: {regex: $regexCode}}) {
      name
      code
    }
  }
`);