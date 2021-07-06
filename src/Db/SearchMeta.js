import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase('SaadFyp.db');

export const SearchMeta = (search) => {
    var cStr=""
    console.log('helo  ',search);
    db.transaction((tx) => {

        tx.executeSql(
            // 'vpath,vname,vlocation,vday,vmonth,vyear,vpeople,vevent,vduration'
          'Select * from Videometa where vlocation like ?',
          [`%${search}%`],
          (tx, results) => {
            for (let i = 0; i < results.rows.length; ++i){
                // console.log('andr temp:',ctemp);
                // ctemp.push(results.rows.item(i)['vpath']);
                cStr=cStr+results.rows.item(i)['vpath'];
            console.log('Video Results', results.rows.item(i)['vpath']);}
            })
        //     console.log(ctemp);
            // ctemp=ctemp+'?????'
        tx.executeSql(
            // 'vpath,vname,vlocation,vday,vmonth,vyear,vpeople,vevent,vduration'
          'Select * from Clipmeta where clocation like ?',
          [`%${search}%`],
          (tx, results) => {
    var ctemp=[];
    cStr=cStr+"clip"
            for (let i = 0; i < results.rows.length; ++i){
             ctemp.push(results.rows.item(i)['vpath']);
             cStr=cStr+results.rows.item(i)['vpath'];
            console.log('Clip Results', results.rows.item(i)['vpath']);}
            console.log('cStr:',cStr);
            console.log('Temppp:',ctemp);})
        //     //   return ctemp;  
          
})
return cStr;
}
// const nasso()