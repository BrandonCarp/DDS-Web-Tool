// `server-only` throws when imported outside a server component. Tests import
// route handlers directly, which is exactly what it is designed to stop, so it
// is aliased to this no-op for the test run only.
export {};
