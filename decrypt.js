const { Transform, pipeline } = require("node:stream");
const fs = require("node:fs/promises");

// Defining our Deccrypt class that inherits from Transform stream
class Decrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; ++i) {
      // Applying here special decryption function for example here we can use for demonstration only caesar cipher algorithm!
      if (chunk[i] === 0) chunk[i] = 255;
      else chunk[i] = chunk[i] - 1;
    }
    callback(null, chunk);
  }
}

(async () => {
  console.time("Decryption started!");
  // Defining the read/write file handlers:
  //   Note that here we need to change the source and destination
  const readFileHandler = await fs.open("encrypt.txt", "r");
  const writeFileHandler = await fs.open("decrypt.txt", "w");
  // Defining the read/write streams:
  const readStream = readFileHandler.createReadStream();
  const writeStream = writeFileHandler.createWriteStream();
  //   Creating an instance of our decrypt class:
  const decrypt = new Decrypt();
  //   Running our algorithm by creating pipe for chunks flow where chunks will be passing through,then our decryption operations will be applied, and finally transferred to be writable chunks added to our destination file.
  //   In other words we can say that the transform stream algorithm acts like a middleware function between the source and the destination.
  pipeline(readStream, decrypt, writeStream, (err) => {
    if (err) {
      console.error("Pipeline failed.", err);
    } else {
      console.timeEnd("Decryption started!");
      console.log("Writing process ended.");
    }
  });
})();
// Algorithm time elapsed : Decryption started!: 61.144ms
// Memory Usage: ~ 20 MB
