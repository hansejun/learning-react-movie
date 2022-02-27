import { useLocale, useSetLocale } from "../ contexts/LocaleContext";

function LocaleSelect({ className = "" }) {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const handleChange = (e) => setLocale(e.target.value);

  return (
    <select value={locale} onChange={handleChange} className={className}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}
export default LocaleSelect;
