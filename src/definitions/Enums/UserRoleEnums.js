export const UserRoleEnum = {
  ÖĞRENCİ: -1,
  ADMİN: 1
}

export function GetUserRoleOptions() {
  const enumKeys = Object.keys(UserRoleEnum);

  return enumKeys.map((key) => (
    <option key={key} value={UserRoleEnum[key]}>
      {key}
    </option>
  ));
}

export function GetRoleName(id) {
  const enumKeys = Object.keys(UserRoleEnum);
  for (const key of enumKeys) {
    if (UserRoleEnum[key] === id) {
      return key;
    }
  }
  return 'TANIMSIZ';
}