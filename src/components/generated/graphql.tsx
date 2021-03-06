import gql from 'graphql-tag';
import * as React from 'react';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Continent = {
   __typename?: 'Continent',
  code?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  countries?: Maybe<Array<Maybe<Country>>>,
};

export type Country = {
   __typename?: 'Country',
  code?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  native?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  continent?: Maybe<Continent>,
  currency?: Maybe<Scalars['String']>,
  languages?: Maybe<Array<Maybe<Language>>>,
  emoji?: Maybe<Scalars['String']>,
  emojiU?: Maybe<Scalars['String']>,
};

export type Language = {
   __typename?: 'Language',
  code?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  native?: Maybe<Scalars['String']>,
  rtl?: Maybe<Scalars['Int']>,
};

export type Query = {
   __typename?: 'Query',
  continents?: Maybe<Array<Maybe<Continent>>>,
  continent?: Maybe<Continent>,
  countries?: Maybe<Array<Maybe<Country>>>,
  country?: Maybe<Country>,
  languages?: Maybe<Array<Maybe<Language>>>,
  language?: Maybe<Language>,
};


export type QueryContinentArgs = {
  code?: Maybe<Scalars['String']>
};


export type QueryCountryArgs = {
  code?: Maybe<Scalars['String']>
};


export type QueryLanguageArgs = {
  code?: Maybe<Scalars['String']>
};


export type CountriesQueryVariables = {};


export type CountriesQuery = (
  { __typename?: 'Query' }
  & { countries: Maybe<Array<Maybe<(
    { __typename?: 'Country' }
    & Pick<Country, 'name' | 'code' | 'currency' | 'emoji'>
  )>>> }
);


export const CountriesDocument = gql`
    query Countries {
  countries {
    name
    code
    currency
    emoji
  }
}
    `;

export const CountriesComponent = (props: Omit<Urql.QueryProps<CountriesQuery, CountriesQueryVariables>, 'query'> & { variables?: CountriesQueryVariables }) => (
  <Urql.Query {...props} query={CountriesDocument} />
);


export function useCountriesQuery(options: Omit<Urql.UseQueryArgs<CountriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CountriesQuery>({ query: CountriesDocument, ...options });
};