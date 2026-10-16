import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const rainfall = [
    { month: "June", observed: 189.0, normal: 163.6, departure: 16 },
    { month: "July", observed: 240.8, normal: 289.2, departure: -17 },
    { month: "August", observed: 204.2, normal: 261.3, departure: -22 },
    { month: "September", observed: 131.8, normal: 173.4, departure: -24 },
];

const chartViews = [
    {
        title: "Monthly rainfall: observed and normal",
        description: "All-India South-West monsoon · millimetres",
        insight: "June was 16% above normal; rainfall was below normal in each of the next three months.",
        type: "monthly",
    },
    {
        title: "Departure from normal by month",
        description: "Observed rainfall compared with monthly normal · percent",
        insight: "The shortfall deepened after June: −17% in July, −22% in August, and −24% in September.",
        type: "departure",
    },
    {
        title: "Season total: observed and normal",
        description: "All-India South-West monsoon · June to September · millimetres",
        insight: "The season total was 121.7 mm below the 887.5 mm normal, a 14% shortfall.",
        type: "total",
    },
];

const chartSource = "https://hydro.imd.gov.in/hydrometweb/%28S%28qwluyvfwmga5piyqyzrlif55%29%29/PRODUCTS/Publications/Rainfall%20Statistics%20of%20India%20-%202015/Rainfall%20Statistics%20of%20India%20-%202015.pdf";

function MonthlyRainfallChart() {
    const x = [74, 239, 404, 569];
    const y = (value) => 137 - (value / 320) * 112;
    const line = (key) => rainfall.map((item, index) => `${index === 0 ? "M" : "L"}${x[index]},${y(item[key]).toFixed(1)}`).join(" ");

    return (
        <>
            <div className="rain-chart-layout">
                <div className="rain-chart-y-axis" aria-hidden="true"><span>300</span><span>200</span><span>100</span><span>0</span></div>
                <svg className="rain-chart-svg" viewBox="0 0 620 150" role="img" aria-label="Observed rainfall was 189 millimetres in June, 240.8 in July, 204.2 in August, and 131.8 in September. Normal values were 163.6, 289.2, 261.3, and 173.4 millimetres respectively.">
                    {[30, 65, 100, 135].map((lineY) => <path key={lineY} className="rain-gridline" d={`M42 ${lineY}H605`} />)}
                    <path className="rain-series-normal" d={line("normal")} />
                    <path className="rain-series-observed" d={line("observed")} />
                    {rainfall.map((item, index) => <circle key={item.month} className="rain-point" cx={x[index]} cy={y(item.observed)} r="4.5" />)}
                </svg>
            </div>
            <div className="rain-chart-axis"><span>June</span><span>July</span><span>August</span><span>September</span></div>
            <div className="rain-legend"><span><i className="rain-legend-normal" />Normal</span><span><i className="rain-legend-observed" />Observed</span></div>
        </>
    );
}

function RainfallChart({ type }) {
    if (type === "monthly") return <MonthlyRainfallChart />;

    if (type === "departure") {
        const zero = 68;
        const scale = 2.45;
        return (
            <>
                <svg className="rain-chart-svg rain-departure-svg" viewBox="0 0 620 150" role="img" aria-label="Rainfall departure from normal: plus 16 percent in June, minus 17 percent in July, minus 22 percent in August, and minus 24 percent in September.">
                    {[25, 45, 68, 91, 114, 137].map((lineY) => <path key={lineY} className="rain-gridline" d={`M30 ${lineY}H605`} />)}
                    <path className="rain-zero-line" d={`M30 ${zero}H605`} />
                    {rainfall.map((item, index) => {
                        const barX = 68 + index * 142;
                        const barY = item.departure > 0 ? zero - item.departure * scale : zero;
                        return <g key={item.month}><rect className={item.departure > 0 ? "rain-bar-positive" : "rain-bar-negative"} x={barX} y={barY} width="62" height={Math.abs(item.departure) * scale} rx="2" /><text className="rain-bar-value" x={barX + 31} y={item.departure > 0 ? barY - 6 : barY + Math.abs(item.departure) * scale + 14} textAnchor="middle">{item.departure > 0 ? "+" : "−"}{Math.abs(item.departure)}%</text></g>;
                    })}
                </svg>
                <div className="rain-chart-axis"><span>June</span><span>July</span><span>August</span><span>September</span></div>
                <div className="rain-legend"><span><i className="rain-legend-positive" />Above normal</span><span><i className="rain-legend-negative" />Below normal</span></div>
            </>
        );
    }

    const max = 950;
    const barWidth = (value) => (value / max) * 470;
    return (
        <svg className="rain-chart-svg rain-total-svg" viewBox="0 0 620 150" role="img" aria-label="Season rainfall total: 765.8 millimetres observed compared with a normal total of 887.5 millimetres.">
            {[0, 250, 500, 750, 1000].map((value) => {
                const x = 120 + (value / max) * 470;
                return <g key={value}><path className="rain-gridline" d={`M${x} 18V128`} /><text className="rain-scale-label" x={x} y="144" textAnchor="middle">{value}</text></g>;
            })}
            <text className="rain-total-label" x="6" y="54">Observed</text><rect className="rain-bar-observed" x="120" y="35" width={barWidth(765.8)} height="26" rx="3" /><text className="rain-total-value" x={126 + barWidth(765.8)} y="53">765.8 mm</text>
            <text className="rain-total-label" x="6" y="100">Normal</text><rect className="rain-bar-normal" x="120" y="81" width={barWidth(887.5)} height="26" rx="3" /><text className="rain-total-value" x={126 + barWidth(887.5)} y="99">887.5 mm</text>
        </svg>
    );
}

function Home() {
    const [activeChart, setActiveChart] = useState(0);
    const chart = chartViews[activeChart];
    const showChart = (direction) => setActiveChart((current) => (current + direction + chartViews.length) % chartViews.length);

    return (
        <main className="home-page">
            <div className="home-main-content">
                <section className="home-hero" aria-labelledby="home-heading">
                    <div className="home-hero-copy">
                        <p className="home-eyebrow">A workspace for clear analysis</p>
                        <h1 id="home-heading">Make your data make sense.</h1>
                        <p className="home-hero-description">Prepare a dataset, explore what it shows, and present findings with enough context for others to understand.</p>
                        <div className="home-hero-actions">
                            <Link className="home-button home-button-primary" to="/login">Login</Link>
                            <Link className="home-button home-button-secondary" to="/register">Get started</Link>
                        </div>
                        <p className="home-credential-note"><strong>Have an issued user ID?</strong> Sign in with the credentials provided for your account.</p>
                    </div>

                    <section className="home-preview" aria-label="Interactive example using India monsoon rainfall data">
                        <div className="home-preview-topbar"><strong>Data example · India rainfall</strong><span>IMD historical data · 2015</span></div>
                        <div className="home-metric-grid">
                            <article className="home-metric-card"><span>Period</span><strong>Jun–Sep 2015</strong></article>
                            <article className="home-metric-card"><span>Observed total</span><strong>765.8 mm</strong></article>
                            <article className="home-metric-card"><span>Vs. normal</span><strong>−14%</strong></article>
                        </div>
                        <div className="home-chart-card">
                            <div className="home-chart-heading">
                                <div><h2>{chart.title}</h2><p>{chart.description}</p></div>
                                <div className="home-chart-controls" aria-label="Chart controls">
                                    <button type="button" onClick={() => showChart(-1)} aria-label="Show previous chart">‹</button>
                                    <span aria-live="polite">{activeChart + 1} / {chartViews.length}</span>
                                    <button type="button" onClick={() => showChart(1)} aria-label="Show next chart">›</button>
                                </div>
                            </div>
                            <div className="home-chart-plot"><RainfallChart type={chart.type} /></div>
                            <p className="home-chart-insight">{chart.insight}</p>
                            <p className="home-chart-source">Source: <a href={chartSource} target="_blank" rel="noreferrer">India Meteorological Department, Rainfall Statistics of India — 2015</a>. Historical data, not a live feed.</p>
                        </div>
                    </section>
                </section>

                <section className="home-workflow" id="workflow" aria-labelledby="workflow-heading">
                    <div className="home-section-heading"><div><p className="home-section-kicker">ONE CONNECTED WORKFLOW</p><h2 id="workflow-heading">From data to a clear result.</h2></div><p>Keep the data, analysis, and explanation connected as you move from a file to a finding.</p></div>
                    <div className="home-workflow-grid">
                        <article className="home-workflow-tile"><h3>Prepare your data</h3><p>Check field names and data types, then look for missing values, duplicate rows, and inconsistent units before beginning analysis.</p></article>
                        <article className="home-workflow-tile"><h3>Explore the question</h3><p>Compare groups and time periods, check unusual values, and consider the dataset’s source and collection context when interpreting patterns.</p></article>
                        <article className="home-workflow-tile"><h3>Share what you found</h3><p>Use a clear chart title, units, and covered period, then explain the takeaway so others can understand the result.</p></article>
                    </div>
                </section>

            </div>
        </main>
    );
}

export default Home;
