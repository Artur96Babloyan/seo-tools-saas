import { countries } from 'countries-list';

interface GoogleDomain {
  value: string;
  label: string;
  countryCode?: string;
}

// Domain format patterns
const DOMAIN_PATTERNS = {
  COM_COUNTRY: ['au', 'br', 'mx', 'ar', 'co', 'sg', 'my', 'ph', 'pk', 'sa', 'tw', 'tr', 'ua', 'vn', 'hk', 'eg', 'pe'],
  CO_COUNTRY: ['uk', 'jp', 'kr', 'in', 'id', 'th', 'za', 'nz', 'il', 'ke', 'ug', 'tz', 'mz', 'ls', 'bw', 'gh'],
  DIRECT: ['ae', 'am', 'by', 'kz', 'uz', 'ru', 'lv', 'lt', 'ee', 'hr', 'rs', 'si', 'sk', 'bg', 'ro', 'md']
};

// Special country code mappings
const COUNTRY_CODE_MAPPINGS: Record<string, string> = {
  uk: 'GB' // Map UK domain to GB country code
};

/**
 * Determines the Google domain format for a given country code
 * @param countryCode - Two letter country code (ISO 3166-1 alpha-2)
 * @returns Formatted Google domain for the country
 */
function getGoogleDomainForCountry(countryCode: string): string {
  const code = countryCode.toLowerCase();

  if (DOMAIN_PATTERNS.COM_COUNTRY.includes(code)) {
    return `google.com.${code}`;
  }

  if (DOMAIN_PATTERNS.CO_COUNTRY.includes(code)) {
    return `google.co.${code}`;
  }

  if (DOMAIN_PATTERNS.DIRECT.includes(code)) {
    return `google.${code}`;
  }

  // Default to google.{country-code} for all other countries
  return `google.${code}`;
}

/**
 * Gets a list of all Google domains with their respective country labels
 * @returns Array of Google domains with country information
 */
export function getGoogleDomains(): GoogleDomain[] {
  // Start with global Google domain
  const domains: GoogleDomain[] = [
    { value: 'google.com', label: 'US - United States (Global)', countryCode: 'US' }
  ];

  // Generate domains for each country
  Object.entries(countries).forEach(([code, country]) => {
    // Skip US as it's already added as global
    if (code === 'US') return;

    // Handle special cases like UK -> GB
    const domainCode = Object.keys(COUNTRY_CODE_MAPPINGS)
      .find(key => COUNTRY_CODE_MAPPINGS[key] === code) || code.toLowerCase();

    const domain = getGoogleDomainForCountry(domainCode);

    domains.push({
      value: domain,
      label: `${code} - ${country.name}`,
      countryCode: code
    });
  });

  // Add special cases that aren't in the countries list
  if (!domains.some(d => d.value === 'google.co.uk')) {
    domains.push({
      value: 'google.co.uk',
      label: 'GB - United Kingdom',
      countryCode: 'GB'
    });
  }

  // Sort by country code for consistent ordering
  return domains.sort((a, b) => (a.countryCode || '').localeCompare(b.countryCode || ''));
}

/**
 * Validates if a given domain is a valid Google search domain
 * @param domain - Domain to validate
 * @returns boolean indicating if the domain is valid
 */
export function isValidGoogleDomain(domain: string): boolean {
  const domains = getGoogleDomains();
  return domains.some(d => d.value === domain.toLowerCase());
} 