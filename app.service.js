const { PrismaClient } = require('@prisma/client')
const fs = require("fs");

const prisma = new PrismaClient()

const storeFiles = (file) => {
    let csv = file.file.data.toString().split("\r\n");
    csv = csv.slice(1)
    console.log(csv)
    const writeStream = fs.createWriteStream('./files/hr.csv')
    writeStream.write('time, bpm\n')
    csv.forEach(value => writeStream.write(value + '\n'));
    // the finish event is emitted when all data has been flushed from the stream
    writeStream.on('finish', () => {
        console.log(`wrote all the array data to file hr.csv`);
    });
    // handle the errors on the write process
    writeStream.on('error', (err) => {
        console.error(`There is an error writing the file ${pathName} => ${err}`)
    });
    // close the stream
    writeStream.end();
}

const deleteByFile = async (filename) => {
    await prisma.heartRate.deleteMany({
        where: {
            filename: {
                equals: filename
            }
        }
    })
}

const deleteAll = async () => {
    await prisma.heartRate.deleteMany()
}
const getAll = async () => {
    const users = await prisma.heartRate.findMany();
    return users
}

const getFiles = async () => {
    var hr =fs.readFileSync('./files/hr.csv',"utf-8");
    return hr
}
module.exports = {deleteByFile, getAll, deleteAll, storeFiles, getFiles}