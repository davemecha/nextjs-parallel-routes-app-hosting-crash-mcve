import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(['en', 'de'], requested) ? requested : 'en';

  return {
    locale,
    messages: {},
  };
});
