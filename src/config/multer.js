const multer = require('multer')
const multerDrive = require('multer-drive');
const path = require('path')
const crypto = require('crypto')
const { google } = require('googleapis')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb (err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            })
        }
    }),

    drive: multerDrive ({
        drive: new google.auth.JWT(),
        contentType: multerDrive.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb (err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            })
        }
    })
};



module.exports = {

    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes["local"],
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
        fileFilter: (req, file, cb) => {
            const allowedMimes = [
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif'
            ];

            if(allowedMimes.includes(file.mimetype)) {
                cb(null, true);
            
            } else {
                cb(new Error('Invalid file type.'));
            }
        }  
};