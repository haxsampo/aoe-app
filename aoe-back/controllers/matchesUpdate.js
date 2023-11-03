const router = require('express').Router()
require('dotenv').config()
const { spawn } = require('child_process');

router.get('/', async (req, res)=> {
  if (!process.env.UPDATE_SECRET === req.body.UPDATE_SECRET) {
    return res.status(401)
  }
  const pythonProcess = spawn('python', ['../matches_update/matchupdater.py'], {
    cwd: __dirname,
  });

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });
  
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    if (code === 0) {
      res.status(200).send('Python script completed successfully');
    } else {
      res.status(500).send('Python script failed');
    }
  });

})

module.exports = router