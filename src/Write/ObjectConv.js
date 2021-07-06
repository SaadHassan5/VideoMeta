export const ObjectConv =(obj)=>{
    // let obj = {a:1}
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
        console.log('Output Length ',output.length);
        return output.trimEnd();
    }
    
    function convertBinaryToObject(str) {
        var newBin = str.split(" ");
        var binCode = [];
        for (let i = 0; i < newBin.length; i++) {
            binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
        }
        let jsonString = binCode.join("");
        return JSON.parse(jsonString)
    }
    // console.log('covertObjectToBinary =>', covertObjectToBinary(obj))
    // console.log('convertBinaryToObject =>', convertBinaryToObject(covertObjectToBinary(obj)))
}