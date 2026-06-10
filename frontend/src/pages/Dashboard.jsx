import { useEffect, useState } from "react";
import api from "../services/api";

import UploadDocument from "../components/UploadDocument";
import SummaryViewer from "../components/SummaryViewer";

function Dashboard() {

    const [documents, setDocuments] = useState([]);

    const [summary, setSummary] = useState("");
    const [notes, setNotes] = useState("");
    const [mcqs, setMcqs] = useState("");
    const [flashcards, setFlashcards] = useState("");

    const [flashcardList, setFlashcardList] =
    useState([]);

    const [flippedCards, setFlippedCards] =
    useState({});

    const [loading, setLoading] = useState(false);

    const loadDocuments = async () => {

        try {

            const response = await api.get(
                "documents/list/"
            );

            setDocuments(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        loadDocuments();

    }, []);

    const generateSummary = async (documentId) => {

        setLoading(true);

        try {

            const response = await api.post(
                "summaries/generate/",
                {
                    document_id: documentId
                }
            );

            setSummary(
                response.data.summary
            );

            setNotes("");
            setMcqs("");
            setFlashcards("");

        } catch (error) {

            alert(
                "Summary Generation Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    const generateNotes = async (documentId) => {

        setLoading(true);

        try {

            const response = await api.post(
                "notes/generate/",
                {
                    document_id: documentId
                }
            );

            setNotes(
                response.data.notes
            );

            setSummary("");
            setMcqs("");
            setFlashcards("");

        } catch (error) {

            alert(
                "Notes Generation Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    const generateMCQs = async (documentId) => {

        setLoading(true);

        try {

            const response = await api.post(
                "mcqs/generate/",
                {
                    document_id: documentId
                }
            );

            setMcqs(
                response.data.mcqs
            );

            setSummary("");
            setNotes("");
            setFlashcards("");

        } catch (error) {

            alert(
                "MCQ Generation Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    const generateFlashcards = async (documentId) => {

    setLoading(true);

    try {

        const response = await api.post(
            "flashcards/generate/",
            {
                document_id: documentId
            }
        );

        const flashcardText =
    response.data.flashcards;

setFlashcards(
    flashcardText
);

const cards = [];

/*
Handles:

Front: Question
Back: Answer

AND

Question?
Answer

formats
*/

const frontBackRegex =
    /Front:\s*(.*?)\s*Back:\s*(.*?)(?=Front:|$)/gs;

let match;

while (
    (match = frontBackRegex.exec(
        flashcardText
    )) !== null
) {

    cards.push({

        front: match[1].trim(),

        back: match[2].trim()

    });
}

/* Fallback Parser */

if (cards.length === 0) {

    const lines =
        flashcardText
            .split("\n")
            .filter(
                line =>
                    line.trim() !== ""
            );

    for (
        let i = 0;
        i < lines.length - 1;
        i += 2
    ) {

        cards.push({

            front:
                lines[i].trim(),

            back:
                lines[i + 1].trim()

        });
    }
}

console.log(
    "Parsed Flashcards:",
    cards
);

setFlashcardList(
    cards
);

        setFlashcardList(
            cards
        );

        setSummary("");
        setNotes("");
        setMcqs("");

    } catch (error) {

        console.log(error);

        alert(
            "Flashcards Generation Failed"
        );

    } finally {

        setLoading(false);
    }
};

    const toggleCard = (index) => {

    setFlippedCards((prev) => ({

        ...prev,

        [index]: !prev[index]

    }));
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to right, #000428, #004e92)",
                color: "white",
                padding: "30px"
            }}
        >

            {/* Header */}

            <div className="text-center mb-5">

                <h1
                    style={{
                        fontSize: "3rem",
                        fontWeight: "bold"
                    }}
                >
                    🤖 AI Study Companion
                </h1>

                <p
                    className="text-light"
                >
                    Smart Learning Powered by AI
                </p>

            </div>
                 {/* Upload Section */}
            <div
    className="shadow-lg mb-5"
    style={{
        borderRadius: "25px",
        background:
            "linear-gradient(135deg,#1e293b,#0f172a)",
        padding: "35px",
        border: "1px solid rgba(11, 123, 236, 0.96)"
    }}
>

    <div
        className="d-flex align-items-center mb-4"
    >

        <div
            style={{
                width: "60px",
                height: "60px",
                borderRadius: "15px",
                background:
                    "linear-gradient(135deg,#4F46E5,#06B6D4)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "28px",
                marginRight: "15px"
            }}
        >
            📚
        </div>

        <div>

            <h2
                className="text-white mb-1"
            >
                Upload Study Material
            </h2>

            <p
                className="text-light mb-0"
            >
                Upload PDFs and let AI generate
                summaries, notes, MCQs and flashcards.
            </p>

        </div>

    </div>

    <div
        style={{
            background:
                "rgba(8, 100, 229, 0.79)",
            borderRadius: "20px",
            padding: "25px",
            border:
                "2px dashed rgba(255,255,255,0.2)"
        }}
    >

        <UploadDocument
            refresh={loadDocuments}
        />

    </div>

</div>




            {/* Statistics */}

            <div className="row mb-4">

                <div className="col-md-4">

                    <div
                        className="card text-center p-4 shadow"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <h2>
                            {documents.length}
                        </h2>

                        <p>
                            Uploaded Documents
                        </p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div
                        className="card text-center p-4 shadow"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <h2>
                            AI
                        </h2>

                        <p>
                            Smart Summary
                        </p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div
                        className="card text-center p-4 shadow"
                        style={{
                            borderRadius: "20px"
                        }}
                    >

                        <h2>
                            📚
                        </h2>

                        <p>
                            Notes & MCQs
                        </p>

                    </div>

                </div>

            </div>

           

            {/* Documents */}

            <div className="row">

                {documents.map((doc) => (

                    <div
                        className="col-md-6 mb-4"
                        key={doc.id}
                    >

                        <div
                            className="card shadow p-4"
                            style={{
                                borderRadius: "20px"
                            }}
                        >

                            <h4>
                                📄 {doc.title}
                            </h4>

                            <small
                                className="text-muted"
                            >
                                {new Date(
                                    doc.uploaded_at
                                ).toLocaleDateString()}
                            </small>

                            <hr />

                            <div
    className="d-flex flex-wrap gap-3 mt-3"
>

    <button
        onClick={() =>
            generateSummary(doc.id)
        }
        className="btn text-white fw-bold"
        style={{
            borderRadius: "12px",
            background:
                "linear-gradient(135deg,#22c55e,#16a34a)",
            border: "none",
            minWidth: "130px",
            height: "45px",
            boxShadow:
                "0 4px 15px rgba(34,197,94,0.4)"
        }}
    >
        📄 Summary
    </button>

    <button
        onClick={() =>
            generateNotes(doc.id)
        }
        className="btn text-white fw-bold"
        style={{
            borderRadius: "12px",
            background:
                "linear-gradient(135deg,#3b82f6,#2563eb)",
            border: "none",
            minWidth: "130px",
            height: "45px",
            boxShadow:
                "0 4px 15px rgba(59,130,246,0.4)"
        }}
    >
        📚 Notes
    </button>

    <button
        onClick={() =>
            generateMCQs(doc.id)
        }
        className="btn text-dark fw-bold"
        style={{
            borderRadius: "12px",
            background:
                "linear-gradient(135deg,#facc15,#f59e0b)",
            border: "none",
            minWidth: "130px",
            height: "45px",
            boxShadow:
                "0 4px 15px rgba(245,158,11,0.4)"
        }}
    >
        ❓ MCQs
    </button>

    <button
        onClick={() =>
            generateFlashcards(doc.id)
        }
        className="btn text-white fw-bold"
        style={{
            borderRadius: "12px",
            background:
                "linear-gradient(135deg,#06b6d4,#0891b2)",
            border: "none",
            minWidth: "130px",
            height: "45px",
            boxShadow:
                "0 4px 15px rgba(6,182,212,0.4)"
        }}
    >
        🧠 Flashcards
    </button>

</div>

                        </div>

                    </div>

                ))}

            </div>

            {loading && (

                <div
                    className="alert alert-info"
                >
                    Generating AI Content...
                </div>

            )}

            {/* Results */}

            {(summary ||
              notes ||
              mcqs ||
              flashcards) && (

                <div
                    className="card shadow p-4 mt-4"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <h2>
                        AI Generated Content
                    </h2>

                    <hr />

                    <div>

    {summary && (
        <div>
            {summary}
        </div>
    )}

    {notes && (
        <div>
            {notes}
        </div>
    )}

    {mcqs && (
        <div>
            {mcqs}
        </div>
    )}

    {flashcardList.length > 0 && (

        <div className="row mt-4">

            {flashcardList.map(
                (
                    card,
                    index
                ) => (

                    <div
                        className="col-md-4 mb-4"
                        key={index}
                    >

                        <div
                            className="flashcard-container"
                        >

                            <div
                                className={`flashcard ${
                                    flippedCards[index]
                                        ? "flipped"
                                        : ""
                                }`}
                                onClick={() =>
                                    toggleCard(
                                        index
                                    )
                                }
                            >

                                <div
                                    className="flashcard-front"
                                >
                                    {card.front}
                                </div>

                                <div
                                    className="flashcard-back"
                                >
                                    {card.back}
                                </div>

                            </div>

                        </div>

                    </div>

                )
            )}

        </div>

    )}

</div>

                </div>

            )}

        </div>
    );
}

export default Dashboard;