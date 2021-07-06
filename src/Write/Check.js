import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
export const Check = (md,filepath)=>{
   console.log('Checkkkkkkkkkkkkk'); 
    let res = '';
res = covertObjectToBinary(md);
console.log('res',res,' len',res.length);
let v = res.replace(/\s/g, '').trim();
console.log('meta bin',v);
let vid =[];
RNFetchBlob.fs.readFile(filepath, 'ascii')
// .then((data) => {
//   for (let index = 0; index < 10; index++) {
// console.log(data[index]);
//   }})
// RNFS.readFile(filepath, 'ascii')
.then((data) => {
    for (let index = 5; index < 7; index++) {
 console.log(data[index]);
// console.log(ascii(data[index]));
// let ss =ascii(data[index])+1;
// console.log(ss);

// var ch = String.fromCharCode(ss)
// data[index]=ch;
// console.log(data[index]);

    }
    // INSERTING MARKER
    let markerId = 47;
var markerBinary = dec2bin(markerId);
if(markerBinary.length<8){
  let len=markerBinary.length;
for (let j = 0; j < 8-len; j++) {
  markerBinary = '0'+markerBinary ;
}}
console.log('Marker ',markerBinary,'  ',markerBinary.length);
var mch='';
    for(let i = 0; i < 8; i++){
        let cond = data[i+89992];
        if(data[i+89992]<0)
         cond=data[i+89992]*-1
        let con= parseInt(markerBinary.charAt(i));
        // console.log('KOOOON',con)
        if(con==1 && cond%2==0){
            mch=mch+'1';
            // console.log('even--',data[i+89992],' con ',con);
            // console.log(data[i+89992]+1);
           data[i+89992]=data[i+89992]+1;}
        else if(con==0 && cond%2==1){
            mch=mch+'0';
    //         console.log('Odd--',data[i+89992],' con ',con);
    // console.log(data[i+89992]-1);
        data[i+89992]=data[i+89992]-1;}
        else
        mch=mch+con;
    
    }
    console.log('MCH :',mch);
//     // LENGTH STORAGE
    let dataLen = v.length;
var lenBin = dec2bin(dataLen);
// if(lenBin.length%8<0){
//   let lenn=lenBin.length;
// for (let j = 0; j < 8-lenn; j++) {
//   lenBin = '0'+lenBin ;
// }}
if(lenBin.length<16){
  let lenn=lenBin.length;
for (let j = 0; j < 16-lenn; j++) {
  lenBin = '0'+lenBin ;
}}
// console.log('BinDataLen ',lenBin,'  ',lenBin.length);
    var lch='';
    for(let i = 0; i < lenBin.length; i++){
        let cond = data[i+90000];
        if(data[i+90000]<0)
         cond=data[i+90000]*-1
        let con= parseInt(lenBin.charAt(i));
        //  console.log('KOOOON',con,' ',cond)
        if(con==1 && cond%2==0){
            lch=lch+'1';
            // console.log('even--',data[i+90000],' con ',con);
            // console.log(data[i+90000]+1);
           data[i+90000]=data[i+90000]+1;}
        else if(con==0 && cond%2==1){
            lch=lch+'0';
    //         console.log('Odd--',data[i+90000],' con ',con);
    // console.log(data[i+90000]-1);
        data[i+90000]=data[i+90000]-1;}
        else{
            console.log('Ye chala');
        lch=lch+con;}
    
    }
    console.log('LCH :',lch);
//     // INSERTING DATA
    var ch='';
    for(let i=0;i<v.length;i++){
        let cond = data[i+90016];
        if(data[i+90016]<0)
         cond=data[i+90016]*-1
        let con= parseInt(v.charAt(i));
        if(con==1 && cond%2==0){
            ch=ch+'1';
            // console.log('even--',data[i+90016],' con ',con);
            // console.log(data[i+90016]+1);
           data[i+90016]=data[i+90016]+1;}
        else if(con==0 && cond%2==1){
            ch=ch+'0';
            // console.log('Odd--',data[i+90016],' con ',con);
    // console.log(data[i+90016]-1);
        data[i+90016]=data[i+90016]-1;}
        else
        ch=ch+con;
    }
    console.log('ch',ch);
    reConvert(filepath,data);
//     readMeta(filepath,v);
})
console.log('Binary end',res);
}

const reConvert =(filepath,data)=>{
    const splitArray = filepath;
      const splittedArray = splitArray.split('///')
      const vidNm = '/'+splittedArray[splittedArray.length - 1]
      console.log('abi wala',vidNm);
      console.log(filepath);
    //   RNFS.writeFile(vidNm,data,'ascii');
      
      RNFetchBlob.fs.writeFile(vidNm,data,'ascii');
  }
  function dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }
  function covertObjectToBinary(obj) {
    let output = '',
        input = JSON.stringify(obj) // convert the json to string.
    // loop over the string and convert each charater to binary string.
    for (let i = 0; i < input.length; i++) {
    let lengt =input[i].charCodeAt(0).toString(2).length;
    var ss='';
    if(lengt<8){
        ss=input[i].charCodeAt(0).toString(2);
     for(let ii=0;ii<8-lengt;ii++){
         ss = '0'+ss;
     }
     output+=ss+" ";
    }
    else{
        output += input[i].charCodeAt(0).toString(2) + " ";}
        // console.log('Output :',output);
    }
    return output.trimEnd();
}
function text2Binary(string) {
  return string.split('').map(function (char) {
      return char.charCodeAt(0).toString(2);
  }).join(' ');
}
function ascii (a) { return a.charCodeAt(0); }