export interface QueryFile {
   [k: string]: string
}

export interface Pagenation {
    pageIndex: number,
    pageSize: number
}

export interface FileInfO {
    _id: string,
    length: number,
    chunkSize: number,
    uploadDate: Date,
    filename: string,
    md5: string,
    contentType: string
}

export interface QueryResult {
    total: number,
    data: FileInfO[]
}

export interface UpdateFile {
    length: number,
    chunkSize: number,
    uploadDate: Date,
    filename: string,
    md5: string,
    contentType: string
    description: string
}