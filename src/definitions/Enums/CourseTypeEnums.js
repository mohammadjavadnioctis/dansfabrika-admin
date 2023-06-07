export const CourseTypeEnum = {
    WORKSHOP : 0,
    KIDS : 1,
    ACADEMY : 2
  }
  
  export function GetCourseTypeOptions() {
    const enumKeys = Object.keys(CourseTypeEnum);
  
    return enumKeys.map((key) => (
      <option key={key} value={CourseTypeEnum[key]}>
        {key}
      </option>
    ));
  }
  
  export function GetCourseTypeName(id) {
    const enumKeys = Object.keys(CourseTypeEnum);
    for (const key of enumKeys) {
      if (CourseTypeEnum[key] === id) {
        return key;
      }
    }
    return 'TANIMSIZ';
  }