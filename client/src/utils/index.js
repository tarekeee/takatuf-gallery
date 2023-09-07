import FileSaver from "file-saver";

export async function downloadImg(_id,photo) {
    FileSaver.saveAs(photo,`download-${_id}.jpg`)
}