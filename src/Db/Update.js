import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase('SaadFyp.db');

export const Update = (name,location,day,month,year,people,event,vid) => {
    console.log('helo  ',vid,name);
    db.transaction((tx) => {
        tx.executeSql(
            // 'vpath,vname,vlocation,vday,vmonth,vyear,vpeople,vevent,vduration'
          'UPDATE Videometa set vname=?, vlocation=? , vday=?, vmonth=?, vyear=?, vpeople=?,vevent=?  where vid=?',
          [name,location,day,month,year,people,event,vid],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
                alert('Updated');
            } else alert('Registration Failed');
          })
          
})}
// const nasso()