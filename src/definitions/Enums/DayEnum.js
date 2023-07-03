export const DayEnum = {
    PAZAR : 0,
    PAZARTESI : 1,
    SALI : 2,
    ÇARŞAMBA : 3,
    PERŞEMBE : 4,
    CUMA : 5,
    CUMARTESİ : 6,
  }
  
  export function GetDayOptions() {
    const enumKeys = Object.keys(DayEnum);
  
    return enumKeys.map((key) => (
      <option key={key} value={DayEnum[key]}>
        {key}
      </option>
    ));
  }
  
  export function GetDayName(id) {
    const enumKeys = Object.keys(DayEnum);
    for (const key of enumKeys) {
      if (DayEnum[key] === id) {
        return key;
      }
    }
    return 'TANIMSIZ';
  }