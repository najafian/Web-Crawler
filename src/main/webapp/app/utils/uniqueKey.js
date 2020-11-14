export default function UniqueID(prefix = 'id-') {
  const lastId = Guid.newID();
  return `${prefix}${lastId}`;
}

export class Guid {

  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static newID() {
    return 'yyxxyxxxxxyx'.replace(/[xy]/g, function (co) {
      const random = Math.random() * 16 | 0;
      const number = co === 'x' ? random : (random & 0x3 | 0x8);
      return number.toString(16);
    });
  }
}
