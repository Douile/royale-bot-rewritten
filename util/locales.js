// localisation

const fs = require('fs');

class Localisation {
  constructor(localeFolder) {
    this.folder = localeFolder;
    fs.readdir(this.folder,(err,files) => {
      files.forEach((file) => {
        if (fs.isdir(file)) {
          this.loadLocale(file);
        }
        if (fs.isfile(file)) {
          // globals check
        }
      })
    }
  }
}
