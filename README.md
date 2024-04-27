# Stream encryptor & decryptor

This project is a simple Node.js application that encrypts/decrypts file data using a simple Caesar cipher algorithm (used just for demonstration more complex algorithm like RSA,AES,DES could be used for production projects) using readable,writable,and transform streams.

## Features

- File Encryption Into another destination folder.
- File Decryption from an encrypted file data.

## Installation

1. Clone this repository to your local machine.

2. Navigate to the project directory.

## Usage

**For encryption use**

```CLI
node encrypt.js
```

**For decryption use**

```CLI
node decrypt.js
```

**Note:**

- The time stated in the comments was stated during running the algorithms on MacBox Pro M1 Chip , 8gb ram. So please note that you will have slightly different numbers but in the same range.

- If you need to use for production please make sure to replace the encryption/decryption algorithm with a more secure algorithm!

- Final note we used here the pipeline logic instead of .pipe() to create the stream because as stated in node documentation .pipe() neither destroys the created files nor deallocates the allocated resources for the buffers from memory (which could cause memory leakage) if an error occurs during the stream operations.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or features you'd like to see.
