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
    console.log('[CREATE FILE] ' + fileName);
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
    console.log('[CREATE FILE] ' + dirEntry.toURL());
  },
  onErrorCreateFile: function (error)
  {
    console.log('[CREATE FILE] Error:');
    console.log(error);
  },

  /**
  * Deletes a file
  **/
  deleteFile: function(Uri, callbackOk, callbackError) {
    callbackOk = callbackOk || this.onFileDeleted;
    callbackError = callbackError || this.onErrorDeletingFile;

    console.log('[DELETE FILE] ' + Uri);
    window.resolveLocalFileSystemURL(
      Uri,
      function onFsLoad(fileEntry) {
        fileEntry.remove(callbackOk, callbackError);
      },
      function onErrorLoadFs(error) {
        console.log('[DELETE FILE] resolveLocalFileSystemURL error:');
        console.log(error.toString());
      }
    );
  },
  onFileDeleted: function()
  {
    console.log('[DELETE FILE] Succesful');
  },
  onErrorDeletingFile: function()
  {
    console.log('[DELETE FILE] Error');
  },

  readFile: function(fileUri, callbackOk, callbackError, readAsBinary)
  {
    readAsBinary = readAsBinary || false;
    callbackOk = callbackOk || this.onFileRead;
    callbackError = callbackError || this.onErrorReadingFile;
    
    console.log('[READ FILE] ' + fileUri);
    window.resolveLocalFileSystemURL(
      fileUri,
      function onFsLoad(fileEntry) {
        fileEntry.file(function (file) {

          var reader = new FileReader();

          reader.onloadend = callbackOk;

          if (readAsBinary) {
            reader.readAsBinaryString(file);
          } else {
            reader.readAsText(file);
          }

        }, callbackError);
      },
      function onErrorLoadFs(error) {
        console.log('[READ FILE] resolveLocalFileSystemURL error:');
        console.log(error.toString());
      }
    );
  },
  onFileRead: function()
  {
    console.log("[READ FILE] Success: " + this.result);
  },
  onErrorReadingFile: function()
  {
    console.log('[READ FILE] Error:');
    console.log(error);
  },

  /**
  * Reads a directory content
  **/
  readDirectory: function(Uri, callbackOk, callbackError)
  {
    callbackOk = callbackOk || this.onDirectoryRead;
    callbackError = callbackError || this.onErrorDirectoryRead;

    window.resolveLocalFileSystemURL(
      Uri,
      function onFsLoad(dirEntry)
      {
        var reader = dirEntry.createReader();
        reader.readEntries(callbackOk, callbackError);
      },
      function onErrorLoadFs(error)
      {
        console.log('[READ DIRECTORY] resolveLocalFileSystemURL error:');
        console.log(error);
      }
    );
  },
  onDirectoryRead: function(entries)
  {
    console.log("[READ DIRECTORY] Listing entries");
    for (var i=0; i < entries.length; i++) {
      console.log(entries[i].name);
    }
  },
  onErrorDirectoryRead: function (e)
  {
    console.log("[READ DIRECTORY] Error: " + e.toString());
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

      // Write data to the file
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
    console.log("[WRITE FILE] Successful");
  },
  onErrorWritingFile: function (e)
  {
    console.log("[WRITE FILE] Error: " + e.toString());
  }
};