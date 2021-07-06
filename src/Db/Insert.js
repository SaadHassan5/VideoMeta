import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase('SaadFyp.db');

export const Insert = (tableName,colomuns,data,questions) => {
    console.log('helo');
    db.transaction(function (tx) {
        console.log('INSERT INTO '+tableName+'('+colomuns+') VALUES ('+questions+')',
        data);
        
        tx.executeSql(
            'INSERT INTO '+tableName+'('+colomuns+') VALUES ('+questions+')',
            data,
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    alert('Meta Added');
                } else alert('Registration Failed');
            },
            (tx, results) => {
                console.log('Results', results);
            }
        );
    });
}