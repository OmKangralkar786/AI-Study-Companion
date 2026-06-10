import { useState } from "react";
import api from "../services/api";

function UploadDocument({ refresh }) {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    const handleUpload = async (e) => {

        e.preventDefault();

        if (!title || !file) {
            alert("Please enter title and select file");
            return;
        }

        const formData = new FormData();

        formData.append("title", title);
        formData.append("file", file);

        try {

            await api.post(
                "documents/upload/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert("Document Uploaded Successfully");

            setTitle("");
            setFile(null);

            refresh();

        } catch (error) {

            console.log(error);

            alert("Upload Failed");
        }
    };

    return (
        <div className="card p-4 shadow">

            <h4>Upload Study Material</h4>

            <form onSubmit={handleUpload}>

                <input
                    type="text"
                    placeholder="Document Title"
                    className="form-control mb-3"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }
                />

                <button
                    className="btn btn-primary"
                >
                    Upload
                </button>

            </form>

        </div>
    );
}

export default UploadDocument;