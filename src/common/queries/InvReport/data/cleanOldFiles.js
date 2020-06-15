if (process.env.NODE_ENV !== `development`) {
  require(`dotenv`).config();
}

const empty = require("empty-folder");

export async function cleanOldFilesFunction() {

  empty(`${process.env.DESTINY_FILE_PATH}`, false, o => {
    if (o.error) console.error(o.error);
    //console.log(o.removed);
    //console.log(o.failed);
  });

  return;
}

cleanOldFilesFunction();