
import RNFetchBlob from 'react-native-fetch-blob';
import base64 from 'react-native-base64';
import { Check } from './Check';
let StartIndex=90000;
export const WriteMeta =  (md,filepath)=>{
  md='arsalan';
   console.log('msg',md);
   let length = md.length;
   console.log('msg',length);
   var lengthBinary = GetBinary(length, 16);
  //  console.log('Get Binary',GetBinary(length, 16));
  //  var mbytes=stringToAsciiByteArray(md);
  //  console.log('mbytes ',mbytes);
       console.log(filepath);
   var s ='saad';
  
   console.log(base64.encode(s));
const vid=[];
const bin=[];
console.log('PATH:',filepath);
console.log('MD:',md);
// Meta to Binary
let res = '';
res = md.split('').map(char => {
   var ss= char.charCodeAt(0).toString(2);
   if(ss.length<8){
     let lenc=ss.length;
     for(let i=0;i<8-lenc;i++)
       ss='0'+ss;
   }
   return ss;
}).join(' ');
console.log('Binary end',res);
console.log(res.length);
// File to Ascii
RNFetchBlob.fs.readFile(filepath, 'ascii')
.then((data) => {
  // for (let index = 0; index < data.length; index++) {
  //   vid[index] = data[index];
  // }
console.log('Length:',data.length);
for (let index = StartIndex +500; index <StartIndex +550 ; index++) {
  console.log(data[index]); 
}
//removing spaces in binary
let v = res.replace(/\s/g, '').trim();
console.log('v',v);

// for marker insertion
let markerId = 47;
var markerBinary = dec2bin(markerId);
if(markerBinary.length<8){
  let len=markerBinary.length;
for (let j = 0; j < 8-len; j++) {
  markerBinary = '0'+markerBinary ;
}}
console.log('Marker ',markerBinary,'  ',markerBinary.length);
let k1=0;
let inn =0;
for (let i = StartIndex - 8; i < StartIndex; i++){
  var bitValue = markerBinary[k1++] == '1' ? true : false;
  let vidBin = dec2bin(data[i]);
  let lenv=vidBin.length;
for (let j = 0; j < 8-lenv; j++) {
  vidBin = '0'+vidBin ;
}

  // console.log(data[i],' bit ',vidBin,' ',bitValue,'mb',markerBinary,'i',i);
  if(inn<8){
    let con= parseInt(markerBinary.charAt(inn++));
  // console.log('c',con);
  if(con==1 && (parseInt(data[i]))%2==0){
    console.log('Odd Meta Even Video ',con,data[i]);
    console.log(data[i]);
    console.log(data[i]+1);
    data[i]=data[i]+1;
  }
  else if(con==0 && (parseInt(data[i]))%2==1){
    console.log('Even Meta Odd Video ',con,data[i]);
    console.log(data[i]);
    console.log(data[i]-1);
    data[i]=data[i]-1;
  }
  else{
    console.log('con ',con);
  }
}
}
// for (let index = 0; index < v.length; index++) {
//   let con= parseInt(v.charAt(index));
//   // console.log('c',con);
//   if(con==1 && (parseInt(data[index+StartIndex]))%2==0){
//     console.log('Odd Meta Even Video ',con,data[index+StartIndex]);
//     console.log(data[index+StartIndex]);
//     console.log(data[index+StartIndex]+1);
//     data[index]=data[index+StartIndex]+1;
//   }
//   else if(con==0 && (parseInt(data[index+StartIndex]))%2==1){
//     console.log('Even Meta Odd Video ',con,data[index+StartIndex]);
//     console.log(data[index+StartIndex]);
//     console.log(data[index+StartIndex]-1);
//     data[index]=data[index+StartIndex]-1;
//   }
//   else{
//     console.log('con ',con);
//   }
// }
//  reConvert(filepath,data)
// convert to binary
// for (let index = 0; index <data.length; index++) {
//       bin[index] =parseInt(data[index].toString(2));
// }
// if(bin.length > 1000)
//   console.log('Huaaaaaa',bin.length);
})


}
const reConvert =(filepath,data)=>{
  const splitArray = filepath;
    const splittedArray = splitArray.split('///')
    const vidNm = '/'+splittedArray[splittedArray.length - 1]
    console.log('abi wala',vidNm);
    console.log(filepath);
    RNFetchBlob.fs.writeFile(vidNm,data,'ascii');
}
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}
// function stringToAsciiByteArray(str)
// {
//     var bytes = [];
//    for (var i = 0; i < str.length; ++i)
//    {
//        var charCode = str.charCodeAt(i);
//       if (charCode > 0xFF)  // char > 1 byte since charCodeAt returns the UTF-16 value
//       {
//           throw new Error('Character ' + String.fromCharCode(charCode) + ' can\'t be represented by a US-ASCII byte.');
//       }
//        bytes.push(charCode);
//    }
//     return bytes;
// }

const ToBinary =(n)=>{
   if (n<2) {
     return n.toString();}
   var divisor = n / 2;
   var remainder = n % 2;
//    console.log('=>',ToBinary(divisor) + remainder);
   return ToBinary(divisor) + remainder;
}
const GetBinary=( n, lengt)=>{
     var binary = ToBinary(n);
    //  console.log('Binary',binary);
    let arr = [lengt];
    let barr = binary.split('');
    // console.log('Array',arr.length);
    // console.log('barr',barr);
    // console.log('Len',lengt);
    let k=0;
    for (let index = 0; index < arr.length; index++) {
      arr[index] = barr[k++];  
    } 
    var str ="";
    arr.forEach(element => {
        str +=element.toString();
    });
       return arr;
    }
