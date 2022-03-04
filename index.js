const fs = require('fs');
const console = require('console');
var metadata = [];
let id = 1;
// let baseUrl = "https://gateway.pinata.cloud/ipfs/";
const path = require('path');
const directoryPath = path.join(__dirname, './assets/images');
const { pinDirectoryToIPFS } = require("./postFolderIPFS");

const getUrl = async () => {
    try {
        // make pinata call
        const pinataResponse = await pinDirectoryToIPFS();
        if(!pinataResponse.success) {
            return {
                success: false,
                status: "😢 Something went wrong while uploading your tokenURI.",
            }
        }
        const baseUrl = pinataResponse.pinataUrl;
        addMetadata(baseUrl);
        fs.readFile("./output/_metadata.json", (err, data) => {
            if(err) throw err;
            fs.writeFileSync("./output/_metadata.json", JSON.stringify(metadata));
            console.log("metadata: ", metadata);
        });
    } catch (error) {
        console.log('Error uploading file: ', error)
    }
}
const addMetadata = async (baseUrl) => {
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            let tempMetadata = {
                id: id,
                name: file,
                image: baseUrl + "/" + file,
                description: "event 8/3",
                addressOwner: "",
            };
            metadata.push(tempMetadata);
            id++;
            // console.log(file);
        });
    });
};
getUrl();