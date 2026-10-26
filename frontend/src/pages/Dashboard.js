import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function getSavedDataset() {
    try {
        const value = JSON.parse(window.localStorage.getItem("adp-uploaded-dataset") || "null");
        return value && typeof value === "object" ? value : null;
    } catch {
        return null;
    }
}

function Dashboard() {
    const [dataset] = useState(getSavedDataset);
    const [isFileCheckComplete, setIsFileCheckComplete] = useState(false);
    const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(true);
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);

    const metrics = useMemo(() => {
        const cells = dataset ? dataset.rowCount * dataset.columnCount : 0;
        const completeness = cells ? Math.round(((cells - dataset.missingCells) / cells) * 100) : null;
        return [
            { label: "Datasets in this browser", value: dataset ? "1" : "0", note: dataset ? dataset.name : "Upload a CSV or TSV file", tone: "green" },
            { label: "Data completeness", value: completeness === null ? "—" : `${completeness}%`, note: dataset ? `${dataset.missingCells} blank cells in the file` : "Available after upload", tone: "blue" },
            { label: "Reports generated", value: "0", note: "No report has been generated", tone: "violet" },
            { label: "Blank cells", value: dataset ? String(dataset.missingCells) : "—", note: dataset?.missingCells ? "Review before analysis" : "Available after upload", tone: "amber" },
        ];
    }, [dataset]);

    const runFileCheck = () => {
        if (!dataset) return;
        setIsFileCheckComplete(true);
    };

    const summaryCsv = [
        "item,value",
        `Dataset,${JSON.stringify(dataset?.name || "No dataset uploaded")}`,
        `Rows,${dataset?.rowCount || 0}`,
        `Columns,${dataset?.columnCount || 0}`,
        `Blank cells,${dataset?.missingCells || 0}`,
        `Column names,${JSON.stringify((dataset?.headers || []).join(" | "))}`,
    ].join("\n");

    return (
        <main className={`workspace-page workspace-page-empty${isWorkspaceOpen ? "" : " workspace-page-collapsed"}`}>
            <aside className="workspace-sidebar" aria-label="Dashboard sections">
                <div className="workspace-sidebar-header"><button className="workspace-hide-control" type="button" aria-label="Hide workspace" aria-expanded={isWorkspaceOpen} onClick={() => setIsWorkspaceOpen(false)}>☰</button></div>
                <Link className="workspace-nav-link" to="/">Home</Link>
                <Link className="workspace-nav-link active" to="/dashboard" aria-current="page">Overview</Link>
                <Link className="workspace-nav-link" to="/#home-topics">Data examples</Link>
                <Link className="workspace-nav-link" to="/upload">Upload data</Link>
                <Link className="workspace-nav-link" to="/reports">Reports</Link>
                <div className="workspace-download-menu">
                    <button className="workspace-nav-link" type="button" aria-expanded={isDownloadOpen} onClick={() => setIsDownloadOpen((open) => !open)}>Downloads</button>
                    {isDownloadOpen && <div className="workspace-download-dropdown">
                        <a href={`data:text/csv;charset=utf-8,${encodeURIComponent(summaryCsv)}`} download="adp-dashboard-summary.csv" onClick={() => setIsDownloadOpen(false)}>Download summary CSV</a>
                        <a href={`data:text/plain;charset=utf-8,${encodeURIComponent("No report has been generated yet. The current dashboard provides a local file summary and blank-cell check only.")}`} download="adp-report-status.txt" onClick={() => setIsDownloadOpen(false)}>Download report status</a>
                    </div>}
                </div>
                <div className="workspace-sidebar-divider" />
                <Link className="workspace-nav-link" to="/help">Help centre</Link>
                <div className="workspace-sidebar-footer"><span className="workspace-nav-label"><strong>{dataset ? "Dataset ready" : "Ready for your data"}</strong><small>{dataset ? dataset.name : "Upload a CSV or TSV file"}</small></span></div>
            </aside>
            {!isWorkspaceOpen && <button className="workspace-show-control" type="button" aria-label="Show workspace" onClick={() => setIsWorkspaceOpen(true)}>☰</button>}

            <section className="workspace-main">
                <div className="workspace-filterbar workspace-filterbar-expanded" aria-label="Selected dataset">
                    <span><strong>Dataset</strong>{dataset ? dataset.name : "No dataset selected"}</span>
                    <span><strong>Rows</strong>{dataset ? dataset.rowCount.toLocaleString() : "—"}</span>
                    <span><strong>Columns</strong>{dataset ? dataset.columnCount : "—"}</span>
                    <span className="workspace-updated">{dataset ? "Saved in this browser" : "Upload a file to begin"}</span>
                </div>

                <div className="workspace-topbar">
                    <div><p className="dashboard-eyebrow">ANALYTICAL DASHBOARD</p><h1>{dataset ? dataset.name : "Start with your data"}</h1><p className="workspace-subtitle">{dataset ? "Review the file summary and blank-cell check before analysis." : "Upload a CSV or TSV file to preview its columns and begin a local data check."}</p></div>
                    <div className="workspace-actions"><button className="workspace-analysis-button" type="button" onClick={runFileCheck} disabled={!dataset}>{isFileCheckComplete ? "File check complete" : "Run file check"}</button><Link className="workspace-primary-button" to="/upload">{dataset ? "Upload another file" : "Upload dataset"}</Link></div>
                </div>

                {isFileCheckComplete && <section className="analysis-progress-card analysis-complete" aria-live="polite"><div className="analysis-progress-copy"><div><strong>File check complete</strong><p>{dataset.missingCells ? `${dataset.missingCells} blank cells found in the uploaded file.` : "No blank cells were found in the uploaded file."}</p></div></div><div className="analysis-progress-value">Ready</div><div className="analysis-progress-track"><i style={{ width: "100%" }} /></div></section>}

                <section className="metric-grid" aria-label="Workspace summary">{metrics.map((metric) => <article className={`metric-card metric-${metric.tone}`} key={metric.label}><div className="metric-card-head" /><p>{metric.label}</p><strong>{metric.value}</strong><small>{metric.note}</small></article>)}</section>

                <div className="workspace-content-grid">
                    <article className="dashboard-panel panel-trend empty-panel" id="dataset-quality"><div className="panel-heading"><div><h2>Data quality check</h2><p>{dataset ? "Blank-cell scan of the selected file." : "A quick file check appears after upload."}</p></div></div><div className="empty-panel-body"><strong>{dataset ? `${dataset.missingCells} blank cells found` : "No dataset to check"}</strong><p>{dataset ? `${dataset.rowCount.toLocaleString()} rows and ${dataset.columnCount} columns were read. Check blank values before interpreting results.` : "Choose a CSV or TSV file to see its headings and sample rows."}</p><Link to="/upload" className="panel-link">{dataset ? "Check another file" : "Upload dataset"}</Link></div></article>
                    <article className="dashboard-panel panel-sources empty-panel" id="dataset-summary"><div className="panel-heading"><div><h2>Data summary</h2><p>{dataset ? "Column names found in the first row." : "Your dataset summary will appear here."}</p></div></div><div className="empty-panel-body"><strong>{dataset ? dataset.name : "No data available yet"}</strong><p>{dataset ? (dataset.headers || []).join(" · ") : "Upload a file to identify its columns and row count."}</p></div></article>
                    <article className="dashboard-panel panel-activity empty-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Activity in this browser session.</p></div><Link to="/reports" className="panel-link">View reports</Link></div><div className="empty-panel-body"><strong>{dataset ? "Dataset prepared" : "No dataset prepared"}</strong><p>{dataset ? `${dataset.name} · ${new Date(dataset.uploadedAt).toLocaleString()}` : "Run a file check after uploading a dataset."}</p><Link to="/upload" className="panel-link">Upload dataset</Link></div></article>
                </div>
                <p className="workspace-local-note">This starter currently stores the dataset summary in your browser. Server-side storage and statistical analysis require the project API.</p>
            </section>
        </main>
    );
}

export default Dashboard;
