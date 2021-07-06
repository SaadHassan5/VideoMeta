import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
export const readMeta=(filepath)=>{
    RNFetchBlob.fs.readFile(filepath, 'ascii')
.then((data) => {
    var mar=''
    for(let i=0;i<8;i++){
        console.log('Mar ',data[i+89992]);
        let cond=data[i+89992];
        if(data[i+89992]<0)
        cond=data[i+89992]*-1;
      if(cond%2==0)
      mar=mar+'0';
      else if(cond%2==1)
      mar=mar+'1';
    }
    console.log('Marker Bin:',mar); 
    // READING Length
    if(mar == '00101111'){
        console.log('META FOUND');
        var lendat='';
        for(let i=90000;i<90016;i++){
            // console.log('Data ',data[i]);
            let cond=data[i];
            if(data[i]<0)
            cond=data[i]*-1;
          if(cond%2==0)
          lendat=lendat+'0';
          else if(cond%2==1)
          lendat=lendat+'1';
    }
    console.log('Bin:',lendat);
    var digit = parseInt(lendat, 2);
    console.log(digit);
    // Reading data
    var dat='';
    for(let i=0;i<digit;i++){
        // console.log('Data ',data[i+90016]);
        let cond=data[i+90016];
        if(data[i+90016]<0)
        cond=data[i+90016]*-1;
        if(i>6){
        if(i%8==0){
        dat=dat+' ';}}
      if(cond%2==0)
      dat=dat+'0';
      else if(cond%2==1)
      dat=dat+'1';
}
console.log('Data:',dat);
console.log('convertBinaryToObject =>', convertBinaryToObject(dat))
return convertBinaryToObject(dat);
 }
 else console.log('META NOT FOUND');
})}
function convertBinaryToObject(str) {
  var newBin = str.split(" ");
  var binCode = [];
  for (let i = 0; i < newBin.length; i++) {
      binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
  }
  let jsonString = binCode.join("");
  return JSON.parse(jsonString)
}