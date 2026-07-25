# Security Specification & Threat Model

## Data Invariants
1. `cms/config`: Only readable by anyone (public site info), writable by authenticated admins or allowed application configuration writes.
2. `inquiries/{inquiryId}`: Readable by authenticated admins, writable by anyone creating a valid project inquiry (with required client fields and length limits).

## Dirty Dozen Attack Payloads
1. **Unauthenticated CMS Overwrite**: Attempting to set `cms/config` with malicious payload without auth.
2. **Inquiry ID Poisoning**: Using a 2KB garbage string as `{inquiryId}`.
3. **Ghost Field Injection**: Adding `isAdmin: true` into inquiry documents.
4. **Invalid Type Injection**: Sending a boolean for `clientEmail`.
5. **Oversized Message Attack**: Injecting a 5MB string into the inquiry message field.
6. **Missing Required Field**: Sending an inquiry missing `clientEmail`.
7. **Client Timestamp Spoofing**: Supplying a past or future timestamp string instead of server timestamp.
8. **PII Data Leak**: Attempting a list query on inquiries as an unauthenticated guest.
9. **Arbitrary Collection Creation**: Creating documents in `/users` or `/admin_data` collections.
10. **Inquiry Update Hijack**: Modifying an existing inquiry document created by another user.
11. **Inquiry Deletion Exploit**: Unauthenticated user attempting to delete inquiry records.
12. **Recursive Path Attack**: Attacking `/cms/config/subpath` with deep nested documents.

## Test Runner
Verified against ESLint `@firebase/eslint-plugin-security-rules` rules standard.
