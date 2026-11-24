import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Grafico({ tipo, labels, valores, cor }) {
  const ref = useRef(null);
  useEffect(() => {
    const g = new Chart(ref.current, { type: tipo,
      data: { labels, datasets: [{ label: "Notificações", data: valores, borderColor: cor, backgroundColor: cor, pointRadius: 2 }] },
      options: { plugins: { legend: { display: false } } } });
    return () => g.destroy();
  }, [tipo, labels, valores, cor]);
  return <canvas ref={ref} />;
}