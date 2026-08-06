# JEE WebAuthentication

Authenticate web requests against LDAP via request parameters and record successful logins in an SSO registry

Source: https://codingdojo.org/kata/JEEWebAuthentication/

## TDD loop

1. **RED** — run the tests. `src/jee-web-authentication.ts` throws `"Not implemented"`, so the test in `src/jee-web-authentication.test.ts` fails.
2. **GREEN** — implement just enough in `src/jee-web-authentication.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run jee-web-authentication:test
```
