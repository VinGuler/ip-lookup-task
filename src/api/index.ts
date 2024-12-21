export const getCountryByIp = async (
  ip: string,
): Promise<{ country: string; countryCode: string; timezone: string }> => {
  const res = await fetch(`https://ip-api.com/json/${ip}`);
  const json = await res.json();
  return {
    country: json.country,
    countryCode: json.countryCode,
    timezone: json.timezone,
  };
};
