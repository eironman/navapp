// Manages files in the device
var FileManager = {

  /**
  * Creates a directory in the device
  **/
  createDirectory: function(dirEntry, dirName, callbackOk, callbackError)
  {
    callbackOk = callbackOk || this.onDirectoryCreated;
    callbackError = callbackError || this.onErrorCreateDirectory;

    dirEntry.getDirectory(
      dirName,
      { create: true },
      callbackOk,
      callbackError
    );
  },
  onDirectoryCreated: function(dirEntry)
  {
    console.log('Directory created: ' + dirEntry.toURL());
  },
  onErrorCreateDirectory: function (error)
  {
    console.log('Create directory error:');
    console.log(error);
  },

  /**
  * Creates a file in the device
  **/
  createFile: function(dirEntry, fileName, callbackOk, callbackError)
  {
    callbackOk = callbackOk || this.onFileCreated;
    callbackError = callbackError || this.onErrorCreateFile;

    // Creates a new file or returns the file if it already exists
    dirEntry.getFile(
      fileName,
      {create: true, exclusive: false},
      callbackOk,
      callbackError
    );
  },
  onFileCreated: function(dirEntry)
  {
    console.log('File created: ' + dirEntry.toURL());
  },
  onErrorCreateFile: function (error)
  {
    console.log('Create file error:');
    console.log(error);
  },

  /**
  * Writes content to a file
  **/
  writeFile: function(fileEntry, dataObj, isAppend, callbackOk, callbackError)
  {
    isAppend = isAppend || false;
    callbackOk = callbackOk || this.onFileWritten;
    callbackError = callbackError || this.onErrorWritingFile;

    // Create a FileWriter object for our FileEntry
    fileEntry.createWriter(function (fileWriter) {

      fileWriter.onwriteend = callbackOk;

      fileWriter.onerror = callbackError;

      // If we are appending data to file, go to the end of the file.
      if (isAppend) {
        try {
          fileWriter.seek(fileWriter.length);
        }
        catch (e) {
          console.log("file doesn't exist!");
        }
      }

      // Write the data
      var buffer = new ArrayBuffer(dataObj.length);
      var array = new Uint8Array(buffer);
      for (var i = 0; i < dataObj.length; i++) {
        array[i] = dataObj.charCodeAt(i);
      }
      fileWriter.write(buffer);
    });
  },
  onFileWritten: function(dirEntry)
  {
    console.log("Successful file write...");
  },
  onErrorWritingFile: function (e)
  {
    console.log("Failed file write: " + e.toString());
  },

  readFile: function(fileEntry)
  {
    fileEntry.file(function (file) {
      var reader = new FileReader();

      reader.onloadend = function() {
        console.log("Successful file read: " + this.result);
      };

      reader.readAsText(file);

    }, function onErrorReadFile() {
      console.log('readFile error:');
      console.log(error);
    });
  }
};