import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getTopTagsMes, getPublicadoresPorMes, getReportadoresPorMes } from '../../services/estadisticas.service';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../styles/Estadisticas.css';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Estadisticas = () => {
  const [tags, setTags] = useState([]);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [anio, setAnio] = useState(new Date().getFullYear());

  const meses = [
    { label: "Enero", value: 1 }, { label: "Febrero", value: 2 }, { label: "Marzo", value: 3 },
    { label: "Abril", value: 4 }, { label: "Mayo", value: 5 }, { label: "Junio", value: 6 },
    { label: "Julio", value: 7 }, { label: "Agosto", value: 8 }, { label: "Septiembre", value: 9 },
    { label: "Octubre", value: 10 }, { label: "Noviembre", value: 11 }, { label: "Diciembre", value: 12 }
  ];

  const currentYear = new Date().getFullYear();
  const anios = [currentYear, currentYear - 1];

  useEffect(() => {
    const fetchTags = async () => {
      const data = await getTopTagsMes();
      setTags(data);
    };
    fetchTags();
  }, []);

  const opcionesDoughnut = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const porcentaje = ((value / total) * 100).toFixed(1);
          return `${porcentaje}%`;
        },
        color: '#000',
        font: { weight: 'bold', size: 14 },
      }
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const pub = await getPublicadoresPorMes(mes, anio);
      const rep = await getReportadoresPorMes(mes, anio);

      const doc = new jsPDF();

      // Título principal centrado
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text(`Estadísticas del mes ${meses[mes - 1].label} ${anio}`, 105, 20, { align: 'center' });

      doc.setLineWidth(0.5);
      doc.line(14, 25, 195, 25);

      // Publicadores
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Usuarios que más publicaron:", 14, 35);

      autoTable(doc, {
        startY: 40,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] },
        styles: { font: 'helvetica', fontSize: 11 },
        head: [['Usuario', 'Total Avisos']],
        body: pub.map(p => [p._id || '-', p.totalAvisos]),
      });

      // Reportadores
      const yAfterPub = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Usuarios que más reportaron:", 14, yAfterPub);

      autoTable(doc, {
        startY: yAfterPub + 5,
        theme: 'striped',
        headStyles: { fillColor: [192, 57, 43] },
        styles: { font: 'helvetica', fontSize: 11 },
        head: [['Usuario', 'Total Reportes']],
        body: rep.map(r => [r._id || '-', r.totalReportes]),
      });

      doc.save(`informe-estadisticas-${mes}-${anio}.pdf`);
    } catch (error) {
      console.error("❌ Error al generar PDF:", error);
      alert("Error al generar el informe. Verifica los datos.");
    }
  };

  return (
    <div className="estadisticas-container">
      {/* Selectores de mes y año */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
        <select value={mes} onChange={e => setMes(Number(e.target.value))}>
          {meses.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

        <select value={anio} onChange={e => setAnio(Number(e.target.value))}>
          {anios.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <button onClick={handleDownloadPDF} className="download-button">
          📥 Descargar informe PDF
        </button>
      </div>

      {/* Gráfico de Tags */}
      <div className="chart-section">
        <h2>🏷️ Tags más utilizados del mes</h2>
        <Doughnut
          data={{
            labels: tags.map(tag => tag._id),
            datasets: [{
              label: "Veces usado",
              data: tags.map(tag => tag.cantidad),
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#FF9F40', '#C9CBCF', '#FF6384', '#36A2EB', '#FFCE56'
              ]
            }]
          }}
          options={opcionesDoughnut}
        />
      </div>
    </div>
  );
};

export default Estadisticas;
