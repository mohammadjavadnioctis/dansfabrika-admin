export const GenderEnum = {
    KADIN : 1,
    ERKEK : 2
  }
  
  export function GetGenderOptions() {
    const enumKeys = Object.keys(GenderEnum);
  
    return enumKeys.map((key) => (
      <option key={key} value={GenderEnum[key]}>
        {key}
      </option>
    ));
  }
  
  export function GetGenderName(id) {
    const enumKeys = Object.keys(GenderEnum);
    for (const key of enumKeys) {
      if (GenderEnum[key] === id) {
        return key;
      }
    }
    return 'TANIMSIZ';
  }