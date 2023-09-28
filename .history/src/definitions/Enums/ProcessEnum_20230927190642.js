export const ProcessEnum = {
    Paket Satış: 1,
    ACADEMY SATIŞ: 2,
    KİDS SATIŞ: 3,
    EVENT SATIŞ: 4,
    OFİS GİDERİ: 5,
    Diğer Giderler:6
  }
  
  export function GetProcessOptions() {
    const enumKeys = Object.keys(ProcessEnum);
  
    return enumKeys.map((key) => (
      <option key={key} value={ProcessEnum[key]}>
        {key}
      </option>
    ));
  }
  
  export function GetProcessName(id) {
    const enumKeys = Object.keys(ProcessEnum);
    for (const key of enumKeys) {
      if (ProcessEnum[key] === id) {
        return key;
      }
    }
    return 'TANIMSIZ';
  }