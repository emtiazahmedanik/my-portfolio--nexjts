/** @type {import('next').NextConfig} */
const path = require("path");
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  output: 'export', // tells Next.js to export static HTML
  basePath: '',     // keep empty for main domain like devemtiaz.tech
};

module.exports = withSentryConfig(nextConfig, {
  org: "nixlab-technologies",
  project: "portfolio-nextjs",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false,
});
