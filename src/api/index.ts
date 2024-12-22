export const getCountryByIp = async (
  ip: string,
): Promise<{ countryCode: string; timezone: string }> => {
  const res = await fetch(`https://ipinfo.io/${ip}?token=c1b4f355bf2e47`);
  const json = await res.json();
  return {
    countryCode: json.country,
    timezone: json.timezone,
  };
};
