const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin('./src/modules/config/i18n.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {};
 
module.exports = withNextIntl(nextConfig);