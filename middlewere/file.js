import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/img');
  },
  filename(req, file, cb) {
    cb(null, `1.png`);
  },
});

export default multer({ storage });

// ${Date.now()}-${file.originalname}
