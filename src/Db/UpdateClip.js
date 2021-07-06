import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase('SaadFyp.db');

export const UpdateClip = (videoNa,vPath,cTitl,cPeo,cEven,cLoca,cStart,cEnd) => {
    console.log('helo  ',videoNa);
    db.transaction((tx) => {
        tx.executeSql(
  //     // 'Clipmeta', 'vname,vpath,ctitle,cpeople,cevent,clocation,cstartdura,cenddura

          'UPDATE Clipmeta set vname=?, vpath=? , ctitle=?, cpeople=?,cevent=? ,clocation=?,cstartdura=? , cenddura=?  where vpath=?',
          [videoNa,vPath,cTitl,cPeo,cEven,cLoca,cStart,cEnd,vPath],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
                alert('Updated');
            } else alert('Registration Failed');
          })
          
})}
// const nasso()