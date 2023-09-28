export const ProcessTypeEnum = {
    Gelir : 0,
    Gider : 1
  }
  
  export function GetProcessTypeOptions() {
    const enumKeys = Object.keys(ProcessTypeEnum);
  
    return enumKeys.map((key) => (
      <option key={key} value={ProcessTypeEnum[key]}>
        {key}
      </option>
    ));
  }
  
  export function GetProcessTypeName(id) {
    const enumKeys = Object.keys(ProcessTypeEnum);
    for (const key of enumKeys) {
      if (ProcessTypeEnum[key] === id) {
        return key;
      }
    }
    return 'TANIMSIZ';
  }