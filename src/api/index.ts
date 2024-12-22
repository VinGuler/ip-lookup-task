const TOKEN = import.meta.env.VITE_IP_INFO_TOKEN;

export const getCountryByIp = async (
  ip: string,
): Promise<{ countryCode: string; timezone: string }> => {
  const res = await fetch(`https://ipinfo.io/${ip}?token=${TOKEN}`);
  const json = await res.json();
  return {
    countryCode: json.country,
    timezone: json.timezone,
  };
};
