export const StatusEnum = {
  SİLİNDİ: -1,
  PASİF: 0,
  AKTİF: 1
}

export function GetStatusOptions() {
  const enumKeys = Object.keys(StatusEnum);

  return enumKeys.map((key) => (
    <option key={key} value={StatusEnum[key]}>
      {key}
    </option>
  ));
}

export function GetStatusName(id) {
  const enumKeys = Object.keys(StatusEnum);
  for (const key of enumKeys) {
    if (StatusEnum[key] === id) {
      return key;
    }
  }
  return 'TANIMSIZ';
}