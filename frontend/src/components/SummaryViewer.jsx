function SummaryViewer({ summary }) {

    if (!summary) return null;

    return (

        <div className="card mt-4 shadow">

            <div className="card-body">

                <h3>
                    AI Generated Summary
                </h3>

                <hr />

                <div
                    style={{
                        whiteSpace: "pre-wrap"
                    }}
                >
                    {summary}
                </div>

            </div>

        </div>
    );
}

export default SummaryViewer;