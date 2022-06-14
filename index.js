/*let csvToJson = require('convert-csv-to-json');

let fileInputName = 'Porto2nd.csv'; 
let fileOutputName = 'Porto2nd.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
*/
const calculateCorrelation = require("calculate-correlation");

const csvFilePath1 = 'Porto2nd.csv'
const csvFilePath2 = 'Porto.csv'
const csv = require('csvtojson');

var getValues = (jsonObj) => {
    let i = 0;
    let j = 0;
    let M=[[]];
    for(let ch = 0; ch <64; ch++){
        M.push([]);
    }    
    for (let obj of jsonObj) {
        i++;
        if (i < 5) continue;
        j = 0;
        let p = 0;
        for (let m of Object.values(obj)) {
            j++;
            if (j < 3) continue;
           // console.log("o = " + o);8
            let v = parseFloat(parseFloat(m).toPrecision(8));
            M[j-3].push(Number.isNaN(v) ? p : v);
            p = v;
        }
    }
    return M;
}
csv()
    .fromFile(csvFilePath1)
    .then((jsonObj1) => {
        csv()
            .fromFile(csvFilePath2)
            .then((jsonObj2) => {
                //  console.log((jsonObj[4]));

                let X = getValues(jsonObj1);
                let Y = getValues(jsonObj2);

              //  console.log(jsonObj1)
               console.log(JSON.stringify(Y[64]));
             const config = {
                string: false,
                decimals: 5,
              };
              let C = [];
              let avg = 0;
              let i = 0;
                for(let ch in X) {
                    if( X[ch].length == 0 || Y[ch].length == 0 || ch > 62 ) continue;
                    let x = [];
                    let y = [];
                    if(X[ch].length > Y[ch].length) {
                        y = Y[ch];
                        x = X[ch].slice(0, y.length);
                    } else {
                        x = X[ch];
                        y = Y[ch].slice(0, x.length);
                    }
                  //  console.log(ch + " " + (x[0]))
                   // console.log(ch + " " + (x.length))
                    const correlation = calculateCorrelation(x, y,config);
                    if(!isNaN(correlation) && correlation < 1) {
                        avg +=  correlation;
                        i++;
                        console.log(correlation)
                    }
                   
                    C.push(correlation);

                }
                console.log(C);
                console.log(avg/i);
                console.log(i);

                });

    });


// Async / await usage
//const jsonArray=await csv().fromFile(csvFilePath);