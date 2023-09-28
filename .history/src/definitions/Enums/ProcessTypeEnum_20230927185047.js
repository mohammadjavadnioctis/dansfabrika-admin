export const ProcessTypeEnum = {
    Gelir : 1,
    Gider : 2
  }
  
  export function GetProcessTypeOptions() {
    const enumKeys = Object.keys(CourseTypeEnum);
  
    return enumKeys.map((key) => (
      <option key={key} value={CourseTypeEnum[key]}>
        {key}
      </option>
    ));
  }
  
  export function GetProcessTypeName(id) {
    const enumKeys = Object.keys(CourseTypeEnum);
    for (const key of enumKeys) {
      if (CourseTypeEnum[key] === id) {
        return key;
      }
    }
    return 'TANIMSIZ';
  }