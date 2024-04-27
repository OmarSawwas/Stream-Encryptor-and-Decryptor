const { Transform, pipeline } = require("node:stream");
const fs = require("node:fs/promises");

// Defining our Encrypt class that inherits from Transform stream
class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; ++i) {
      // Applying here special decryption function for example here we can use for demonstration only caesar cipher algorithm!
      if (chunk[i] === 255) chunk[i] = 0;
      else chunk[i] = chunk[i] + 1;
    }
    callback(null, chunk);
  }
}

(async () => {
  console.time("Encryption started!");
  // Defining the read/write file handlers:
  const readFileHandler = await fs.open("original.txt", "r");
  const writeFileHandler = await fs.open("encrypt.txt", "w");
  // Defining the read/write streams:
  const readStream = readFileHandler.createReadStream();
  const writeStream = writeFileHandler.createWriteStream();
  //   Creating an instance of our encrypt class:
  const encrypt = new Encrypt();
  //   Running our algorithm by creating pipe for chunks flow where chunks will be passing through,then our encryption operations will be applied, and finally transferred to be writable chunks added to our destination file.
  //   In other words we can say that the transform stream algorithm acts like a middleware function between the source and the destination.
  pipeline(readStream, encrypt, writeStream, (err) => {
    if (err) {
      console.error("Pipeline failed.", err);
    } else {
      console.timeEnd("Encryption started!");
      console.log("Writing process ended.");
    }
  });
})();
// Original file size: 22 MB
// Algorithm time elapsed : Encryption started!: 75.382ms
// Memory Usage: ~ 35 MB
