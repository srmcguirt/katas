# {{ title }}

{{ description }}
{% if source %}
Source: {{ source }}
{% endif %}
## TDD loop

1. **RED** — run the tests. `src/{{ name | kebab_case }}.ts` throws `"Not implemented"`, so the test in `src/{{ name | kebab_case }}.test.ts` fails.
2. **GREEN** — implement just enough in `src/{{ name | kebab_case }}.ts` to make the test pass.
3. **REFACTOR** — clean up the implementation while keeping the test green. Add more test cases as needed.

Run tests for this package:

```
bun test
```

Or via moon:

```
moon run {{ name | kebab_case }}:test
```
