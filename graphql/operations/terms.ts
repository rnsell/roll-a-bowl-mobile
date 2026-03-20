import { graphql } from '../generated';

export const GetTermsStatus = graphql(`
  query GetTermsStatus {
    termsStatus {
      termsRequiresAcceptance
      termsCurrentVersion
      termsAcceptedVersion
      termsEffectiveDate
      privacyRequiresAcceptance
      privacyCurrentVersion
      privacyAcceptedVersion
      privacyEffectiveDate
    }
  }
`);

export const GetCurrentTerms = graphql(`
  query GetCurrentTerms($documentType: String!) {
    currentTerms(documentType: $documentType) {
      version
      content
      effectiveDate
    }
  }
`);

export const AcceptTerms = graphql(`
  mutation AcceptTerms($documentType: String!, $version: String!) {
    acceptTerms(documentType: $documentType, version: $version) {
      id
      version
      acceptedAt
    }
  }
`);
