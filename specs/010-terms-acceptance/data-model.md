# Data Model: Terms & Privacy Policy Acceptance

**Feature**: 010-terms-acceptance

## Entities (from API)

### TermsStatusType
| Field | Type | Description |
|-------|------|-------------|
| requiresAcceptance | Boolean | Whether the user needs to accept terms |
| currentVersion | String? | Current terms version (null if not configured) |
| acceptedVersion | String? | Version the user last accepted (null if never) |
| effectiveDate | DateTime? | When current version became effective |

### TermsDocument
| Field | Type | Description |
|-------|------|-------------|
| version | String | Version identifier (YYYY-MM-DD) |
| content | String | Markdown content |
| effectiveDate | DateTime | When this version is effective |

### TermsAcceptanceType
| Field | Type | Description |
|-------|------|-------------|
| id | ID | Unique identifier |
| version | String | Accepted version |
| acceptedAt | DateTime | When acceptance occurred |

## Client-Side State

| State | Location | Description |
|-------|----------|-------------|
| termsStatus | Apollo cache | Cached terms status query result |
| checkboxChecked | React state | Whether the "I agree" checkbox is checked |
