'use client'


import { FC, useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
// import "./FileUploadComponent.scss";

interface FileUploadProps {
    onFilesChange?: Function;
    showSize?: boolean;
    uploadOnButtonCallback?: Function;
    uploadDisabled?: boolean;
    fileLimit?: number;
    fontSize?: string;
    acceptedFileformats?: Array<string>;
    fileUploadText?: string;
    existentFile?: File;
}

const FileUploadComponent: FC<FileUploadProps> = ({
    onFilesChange,
    showSize,
    uploadOnButtonCallback,
    uploadDisabled,
    fileLimit,
    fontSize,
    acceptedFileformats,
    fileUploadText,
    existentFile,
}) => {
    const [files, setFiles] = useState<Array<File>>(
        existentFile ? [existentFile] : []
    );

    const [acceptedFiles, setAcceptedFiles] = useState<Array<File>>([]);
    useEffect(() => {
        if (onFilesChange) onFilesChange(files);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    useEffect(() => {
        if (fileLimit !== undefined) {
            if (acceptedFiles.length + files.length <= fileLimit) {
                setFiles((prev) => [...prev, ...acceptedFiles]);
            } else {
                alert("File limit exceeded");
            }
        } else {
            setFiles((prev) => [...prev, ...acceptedFiles]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acceptedFiles]);

    const onDrop = useCallback(
        (acceptedFiles: Array<File>, fileRejections: FileRejection[]) => {
            if (fileRejections.length > 0) {
                if (fileRejections[0].errors[0].code === "file-invalid-type") {
                    alert("Invalid file type");
                }
                if (fileRejections[0].errors[0].code === "too-many-files") {
                    alert("Too many files");
                }
            }
            setAcceptedFiles(acceptedFiles);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        noClick: true,
        maxFiles: fileLimit,
        //@ts-ignore
        accept: acceptedFileformats,
    });
    const hasFiles = files.length > 0;

    const removeFile = (fileToRemove: File) => {
        let newFiles: Array<File> = files.filter((file) => file !== fileToRemove);
        setFiles(newFiles);
    };

    const openExplorerDialog = (event: any) => {
        if (event.target.className instanceof SVGAnimatedString) return;
        open();
    };

    const removeAllFiles = () => {
        setFiles([]);
    };

    const setTotalFileSize = () => {
        let totalSize = 0;
        files.forEach((file) => {
            totalSize += file.size;
        });

        if (totalSize > 100000000) {
            setFiles([]);
        }
    };

    useEffect(() => {
        setTotalFileSize();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    return (
        <div >
            <div >
                <div
                    className="upload-file-component"
                    {...getRootProps()}
                    onClick={(e: any) => openExplorerDialog(e)}
                >
                    <input {...getInputProps()} />
                    {!hasFiles && (
                        <div>
                            <div>
                                {isDragActive ? (
                                    <h5 color="secondary" >
                                        Drop the files here ...
                                    </h5>
                                ) : (
                                    <h5
                                    >
                                        {fileUploadText ??
                                            "Drag 'n' drop some files here, or click to select files"}
                                    </h5>
                                )}
                            </div>
                        </div>
                    )}

                    <div >
                        {files.map((file, index) => (
                            <div key={index}>
                                <div onClick={() => removeFile(file)}
                                >{
                                        showSize
                                            ? file.name +
                                            "  " +
                                            (file.size / 1024 / 1024).toFixed(2) +
                                            "MB"
                                            : file.name
                                    }</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <div >
                    {uploadOnButtonCallback && (
                        <div>
                            <div >
                                <button
                                    disabled={!hasFiles}
                                    color={"error"}
                                    onClick={(e) => {
                                        if (!uploadDisabled) removeAllFiles();
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                            <div>
                                <button
                                    disabled={uploadDisabled}
                                    color={"success"}
                                    onClick={(e) => {
                                        if (!uploadDisabled && hasFiles)
                                            uploadOnButtonCallback(files, removeAllFiles);
                                    }}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploadComponent;
