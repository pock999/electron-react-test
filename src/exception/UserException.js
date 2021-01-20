/**
 * message => 放置錯誤訊息
 * name => 放置該物件的名子，藉由捕捉該例外物件的名子來促使程式的運行
 */
export default function UserException(message) {
  this.message = message;
  this.name = 'UserException';
}
