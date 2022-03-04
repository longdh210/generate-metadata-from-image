//imports needed for this function
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const recursive = require('recursive-fs');
const basePathConverter = require('base-path-converter');

const pinataApiKey = "808e178a020cc1ef6216";
const pinataSecretApiKey = "c101b76b799e6959268b6a338ec07f9b00632891005aea69696dd153641b3896";

const pinDirectoryToIPFS = async () => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const src = './assets/images';

    //we gather the files from a local directory in this example, but a valid readStream is all that's needed for each file in the directory.
    var { dirs, files } = await recursive.readdirr(src);
    let data = new FormData();
        files.forEach((file) => {
            //for each file stream, we need to include the correct relative file path
            data.append(`file`, fs.createReadStream(file), {
                filepath: basePathConverter(src, file)
            });
        });

        const metadata = JSON.stringify({
            name: 'FolderImages',
            keyvalues: {
                exampleKey: 'exampleValue'
            }
        });
        data.append('pinataMetadata', metadata);
        try {
            const res = await axios.post(url, data, {
                maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    pinata_api_key: pinataApiKey,
                    pinata_secret_api_key: pinataSecretApiKey
                }
            })
            return {
                success: true,
                pinataUrl: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
        }
};

module.exports = { pinDirectoryToIPFS }

